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

    const imageUrlsArray = product.image_urls ? JSON.parse(product.image_urls) : [];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="bg-white z-0 p-4 rounded-lg shadow-md">
            <Carousel
                className="w-full"
                showStatus={false}
                showThumbs={false}
                infiniteLoop
                swipeable
            >
                {imageUrlsArray.map((imageUrl: string, index: number) => (
                    <div key={index}>
                        <img src={imageUrl} alt={`${product.name} ${index}`} onClick={handleClick}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                    </div>
                ))}
            </Carousel>

            <Link to={`/products/${product.id}`} key={product.id}>
                <div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-700 mb-4">{product.price}€</p>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-700 mb-2">Sizes:</p>
                            {sizes.map((size: string, index: number) => (
                                <span key={index} className="mr-2 font-semibold text-gray-700">{size}</span>
                            ))}
                        </div>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6a2 2 0 012 2v11a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zm0 0V4a2 2 0 012-2h2a2 2 0 012 2v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
