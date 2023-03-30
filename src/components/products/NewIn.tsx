import React, { useEffect, useState } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';

const NewIn = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                console.log(data)
                setProducts(data.products);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Uutuudet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.slice(-6).map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewIn;
