
import React, { useState, useEffect } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';



interface ShoeProps {
    size?: string;
}

const Shoes: React.FC<ShoeProps> = ({ size }) => {

    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products?category=Shoes');
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Kengät</h2>
            <p className="text-gray-700">Uudet skeittikengät.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shoes;
