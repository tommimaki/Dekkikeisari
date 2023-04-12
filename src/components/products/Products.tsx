import * as React from 'react';
import Filters from './Filters';
import Breadcrumb from '../BreadCrumb';
import CategoryProducts from './CategoryProducts';

const Products = () => {
    const [category, setCategory] = React.useState('');
    const [size, setSize] = React.useState('');

    const handleFilterChange = (id: string, value: string) => {
        if (id === 'category') {
            setCategory(value);
        } else if (id === 'size') {
            setSize(value);
        }
    };

    const categoryMapping: {
        [key: string]: {
            category: string;
            title: string;
            subheading: string;
        };
    } = {
        decks: {
            category: 'Skateboards',
            title: 'DEKIT',
            subheading: 'Laaja valikoima dekkejä alan parhailta valmistajilta.',
        },
        shoes: {
            category: 'Shoes',
            title: 'KENGÄT',
            subheading: 'Valikoima kenkiä eri tarkoituksiin.',
        },
        shirts: {
            category: 'Shirts',
            title: 'PAIDAT',
            subheading: 'Paitoja joka lähtöön.',
        },
    };

    const selectedCategory = categoryMapping[category] || {};

    return (
        <div>
            <Breadcrumb name={'Tuotteet'} />
            <Filters handleFilterChange={handleFilterChange} />
            <div>
                {category === '' && size === '' ? (
                    <>
                        {Object.keys(categoryMapping).map((key) => {
                            const { category, title, subheading } = categoryMapping[key];
                            return (
                                <CategoryProducts
                                    key={key}
                                    category={category}
                                    title={title}
                                    subheading={subheading}
                                />
                            );
                        })}
                    </>
                ) : (
                    <CategoryProducts
                        category={selectedCategory.category}
                        title={selectedCategory.title}
                        subheading={selectedCategory.subheading}
                        size={size}
                    />
                )}
            </div>
        </div>
    );
};

export default Products;
