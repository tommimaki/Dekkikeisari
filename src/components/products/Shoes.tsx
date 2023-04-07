
import React, { useState, useEffect } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';




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

    const filteredProducts = products.filter((product) => {
        if (size) {
            const sizesArray = JSON.parse(product.sizes);
            return sizesArray.includes(size);
        }
        return true;
    });
    return (
        <div className="py-8  mx-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Kengät</h2>
            <p className="text-gray-700 mb-6">Uudet skeittikengät.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shoes;
