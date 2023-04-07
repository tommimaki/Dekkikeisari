
import * as React from 'react';
import Decks from './Decks';
import Shoes from './Shoes';
import Shirts from './Shirts';
import Filters from './Filters';
import Breadcrumb from '../BreadCrumb';
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

    console.log(size)
    return (
        <div>

            <Breadcrumb name={"products"} />
            <Filters handleFilterChange={handleFilterChange} />
            <div>
                {category === '' && size === '' && (
                    <div>
                        <Decks />
                        <Shoes />
                        <Shirts />
                    </div>
                )}
                {category === 'decks' && (
                    <div>
                        <Decks size={size} />
                    </div>
                )}
                {category === 'shoes' && (
                    <div>
                        <Shoes size={size} />
                    </div>
                )}
                {category === 'shirts' && (
                    <div>
                        <Shirts size={size} />
                    </div>
                )}
            </div>
        </div>
    );

}
export default Products;