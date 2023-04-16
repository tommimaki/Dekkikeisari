import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Product from '../../interfaces/product';
import { addToCart } from '../../features/cart/cartSlice';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Breadcrumb from '../layout/BreadCrumb';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();
    const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
    const [showSizeQuantityMessage, setShowSizeQuantityMessage] = useState(false);


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${BASE_API_URL}products/${id}`);
            const data = await response.json();
            setProduct(data.product);
        };

        fetchProduct();
    }, [id]);


    const handleAddToCart = () => {
        if (product) {
            if (selectedSize && quantity) {
                const cartProduct = { product: { ...product, size: selectedSize }, quantity };
                dispatch(addToCart(cartProduct));
                setShowAddedToCartMessage(true);
                setTimeout(() => setShowAddedToCartMessage(false), 3000);
            } else {
                setShowSizeQuantityMessage(true);
                setTimeout(() => setShowSizeQuantityMessage(false), 3000);
            }
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }


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


    return (

        <div className='flex-col mb-10'>
            <Breadcrumb category={product.category} name={product.name} />

            <div className="min-h-screen mx-auto max-w-7xl px-4 flex flex-col items-center justify-center sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6">
                    <div className="sm:w-1/2 z-0 flex items-center justify-center lg:justify-start mb-8 sm:mb-0">
                        <Carousel
                            className="w-full"
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop
                            swipeable
                            autoPlay
                            interval={2000}
                        >
                            {imageUrlsArray.map((imageUrl: string, index: number) => (
                                <div key={index}>
                                    <img src={imageUrl} alt={`${product.name} ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="sm:w-1/2">
                        <h3 className="text-4xl text-center font-semibold mb-4">{product.name}</h3>
                        <p className="text-gray-700 pb-2 border-b ">{product.description}</p>
                        <p className="text-black text-xl mt-10 text-center lfont-bold mb-4">{product.price}€</p>
                        <div className="flex gap-6 items-center  justify-center mb-4">
                            {product.sizes && (
                                <div>
                                    <label htmlFor="size" className="block mb-2">
                                        Koko
                                    </label>
                                    <select
                                        id="size"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value || "")}
                                        className="w-24 border border-gray-300 p-2 rounded"
                                    >
                                        <option value="">Koko</option>
                                        {(() => {
                                            const parsedSizes = JSON.parse(product.sizes);
                                            return parsedSizes.map((sizeString: string) => (
                                                <option key={sizeString} value={sizeString}>
                                                    {sizeString}
                                                </option>
                                            ));
                                        })()}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label htmlFor="quantity" className="block mb-2">
                                    Määrä
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    min={1}
                                    className="w-24 border border-gray-300 p-2 rounded"
                                />
                            </div>
                        </div>
                        <hr className='mb-2' />
                        <div className="flex flex-col justify-center">

                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 self-center rounded"
                                // disabled={!selectedSize}
                                onClick={handleAddToCart}
                            >
                                Lisää ostoskoriin
                            </button>
                            {showAddedToCartMessage && (
                                <div className="mt-4 text-green-600  text-center">
                                    Tuote lisätty ostoskoriin!
                                </div>
                            )}
                            {showSizeQuantityMessage && (
                                <div className="mt-4 text-center text-red-600">
                                    Valitse koko ja määrä!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default ProductPage;
