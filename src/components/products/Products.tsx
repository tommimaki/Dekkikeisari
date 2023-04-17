import React, { useState } from 'react';
import Filters from './Filters';
import Breadcrumb from '../layout/BreadCrumb';
import CategoryProducts from './CategoryProducts';
import Product from '../../interfaces/product';

const Products = () => {
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [search, setSearch] = useState('');

    const handleFilterChange = (id: string, value: string) => {
        if (id === 'category') {
            setCategory(value);
        } else if (id === 'size') {
            setSize(value);
        } else if (id === 'search') {
            setSearch(value);
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

    //needed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedCategory = categoryMapping[category] || {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filteredProductsCount, setFilteredProductsCount] = React.useState<{ [key: string]: number }>({});

    const handleFilteredProductsUpdate = (key: string, filteredProducts: Product[]) => {
        setFilteredProductsCount((prev) => ({ ...prev, [key]: filteredProducts.length }));
    };

    return (
        <div>
            <Breadcrumb name={'Tuotteet'} />
            <Filters handleFilterChange={handleFilterChange} />
            <div>
                {Object.keys(categoryMapping).map((key) => {
                    const { category, title, subheading } = categoryMapping[key];
                    return (
                        <CategoryProducts
                            key={key}
                            category={category}
                            title={title}
                            subheading={subheading}
                            size={size}
                            search={search}
                            onFilteredProductsUpdate={(filtered) => handleFilteredProductsUpdate(key, filtered)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
