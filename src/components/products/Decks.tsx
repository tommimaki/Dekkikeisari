
import React, { useState, useEffect } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';

interface DecksProps {
    size?: string;
}

const Decks: React.FC<DecksProps> = ({ size }) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products?category=Skateboards');
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
        <div className="py-8">
            <h3 className="text-2xl font-semibold mb-4">dekit</h3>
            <p className="text-gray-700">Laaja valikoima dekkejä alan parhailta valmistajilta.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Decks;
