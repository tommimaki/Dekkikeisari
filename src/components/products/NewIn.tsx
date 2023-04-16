import React, { useEffect, useState } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';


const NewIn = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}products`);
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
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (

        <div className="py-8 mx-8">
            <h2 className="text-2xl text-center font-semibold mb-4">Uutuudet</h2>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                {products.slice(-6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default NewIn;
