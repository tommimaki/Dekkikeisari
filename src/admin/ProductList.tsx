import React, { useEffect, useState } from 'react';
import Product from '../interfaces/product';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                console.log('Data:', data);
                setProducts(data.products);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <ul className="divide-y divide-gray-300">
                {products.map((product) => (
                    <li key={product.id} className="py-2">
                        {product.name}
                        {/* Display other product information */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
