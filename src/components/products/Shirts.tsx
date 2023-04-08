import React, { useState, useEffect } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom'

interface ShirtProps {
    size?: string;
}

const Shirts: React.FC<ShirtProps> = ({ size }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products?category=Shirts');
            const data = await response.json();

            const parsedProducts = data.products.map((product: Product) => {
                let imageUrlsArray = [];

                try {
                    if (typeof product.image_urls === 'string') {
                        const parsed = JSON.parse(product.image_urls);
                        imageUrlsArray = Array.isArray(parsed) ? parsed : JSON.parse(parsed);
                    } else if (Array.isArray(product.image_urls)) {
                        imageUrlsArray = product.image_urls;
                    } else {
                        console.error('Error: Unsupported image_urls format');
                    }
                } catch (error) {
                    console.error('Error parsing image URLs:', error);
                }

                return { ...product, image_urls: imageUrlsArray };
            });

            setProducts(parsedProducts);
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
        <div className="py-8 mx-8">
            <Link
                to="/shirts"
            >

                <h2 className="text-3xl font-bold mb-6 text-center">PAIDAT</h2>
            </Link>
            <hr className="mb-4" />
            <p className="text-gray-700 font-semibold mb-6"> Paitoja joka lähtöön</p>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shirts;
