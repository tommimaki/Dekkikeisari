import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../../interfaces/product';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const sizes = JSON.parse(product.sizes);


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



    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="flex justify-center product-card h-full">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
                <Carousel
                    className="rounded-t-lg"
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    swipeable
                >
                    {imageUrlsArray.map((imageUrl: string, index: number) => (
                        <div key={index}>
                            <img
                                src={imageUrl}
                                alt={`${product.name} ${index}`}
                                onClick={handleClick}
                                className=" h-60 sm:h-80 object-cover  rounded-t-lg product-image"
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="py-1 px-4">
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                        </h5>

                        <div className="flex flex-col md:flex-row justify-between  mb-3">
                            <div className="flex flex-col flex-start">
                                <p className="text-sm sm:text-base text-left text-white mb-2">Koot:</p>
                                <div className="flex flex-wrap">
                                    {sizes.map((size: string, index: number) => (
                                        <span key={index} className="text-sm sm:text-base mr-2 mb-1 font-semibold text-white">{size}</span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full md:w-28 md:h-110 md:self-end mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                <div className='flex justify-between'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6a2 2 0 012 2v11a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zm0 0V4a2 2 0 012-2h2a2 2 0 012 2v1" />
                                    </svg>
                                    {product.price}€
                                </div>
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
