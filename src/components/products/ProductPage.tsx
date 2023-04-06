import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../interfaces/product';
import { addToCart } from '../../features/cart/cartSlice';
import { RootState } from '../../store';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart?.items);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3001/products/${id}`);
            const data = await response.json();
            setProduct(data.product);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product && selectedSize) {
            const cartProduct = { ...product, quantity, size: selectedSize };
            dispatch(addToCart(cartProduct));
        }
    };
    if (!product) {
        return <div>Loading...</div>;
    }

    const imageUrlsArray = JSON.parse(product.image_urls);


    return (
        <div className="min-h-screen mx-auto max-w-7xl px-4 flex flex-col items-center justify-center sm:px-6 lg:px-8">
            {product.category && (
                <div className="mb-4 self-start">
                    <Link
                        to={`/${product.category}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <p>

                            tuotteet/{product.category}
                        </p>

                    </Link>
                </div>
            )}
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
                    <h3 className="text-4xl font-semibold mb-4">{product.name}</h3>
                    <p className="text-gray-700 pb-2 border-b ">{product.description}</p>
                    <p className="text-black text-xl mt-10 lfont-bold mb-4">{product.price}€</p>
                    <div className="flex gap-6 items-center justify-center mb-4">
                        {product.sizes && (
                            <div>
                                <label htmlFor="size" className="block mb-2">
                                    Size
                                </label>
                                <select
                                    id="size"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value || "")}
                                    className="w-24 border border-gray-300 p-2 rounded"
                                >
                                    <option value="">Size</option>
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
                                Quantity
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
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        disabled={!selectedSize}
                        onClick={handleAddToCart}
                    >
                        Lisää ostoskoriin
                    </button>
                </div>
            </div>
        </div>
    );


};

export default ProductPage;
