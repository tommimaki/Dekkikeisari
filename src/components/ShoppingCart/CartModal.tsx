import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { FaTimes } from 'react-icons/fa';
import Checkout from './Checkout';
import { closeCart, emptyCart, removeFromCart } from '../../features/cart/cartSlice';
import Product from '../../interfaces/product';



const CartModal = () => {
    const cartItems = useSelector((state: RootState) => state.cart?.items);

    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCloseCart = () => {
        dispatch(closeCart()); // use the closeCart action creator
    };
    const handleEmptyCart = () => {
        dispatch(emptyCart()); // use the closeCart action creator
    };
    const handleRemoveFromCart = (item: Product) => {
        dispatch(removeFromCart(item));
    };

    const handleCheckoutSuccess = () => {
        handleEmptyCart(); // Empty the cart
        handleCloseCart(); // Close the cart
    };




    useEffect(() => {
        const calculateTotal = () => {
            const total = cartItems.reduce((accumulator: number, item: Product) => {
                const price = Number(item.price);
                if (isNaN(price)) return accumulator;
                return accumulator + price * (item.quantity ?? 0);
            }, 0);

            setTotalAmount(total);
        };

        calculateTotal();
    }, [cartItems]);




    return (
        // <div className="cart-modal">
        //     <div className="flex justify-end ">
        //         <button onClick={handleCloseCart}>
        //             <FaTimes />
        //         </button>
        //     </div>
        //     <h2 className="text-lg font-bold mb-4">Cart</h2>

        //     <div className="grid grid-cols-12 gap-4 mb-4 ">
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700">Product</p>
        //         </div>
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700">Price</p>
        //         </div>
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700">Size</p>
        //         </div>
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700">Quantity</p>
        //         </div>
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700">Total</p>
        //         </div>
        //         <div className="col-span-2">
        //             <p className="font-semibold text-gray-700"></p>
        //         </div>
        <div className="cart-modal">
            <div className="flex justify-end">
                <button onClick={handleCloseCart}>
                    <FaTimes />
                </button>
            </div>
            <h2 className="text-lg font-bold mb-4">Cart</h2>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 mb-4">
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700">Product</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700">Price</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700">Size</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700">Quantity</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700">Total</p>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <p className="font-semibold text-gray-700"></p>
                </div>




                {
                    cartItems.map((item: Product) => {
                        const price = Number(item.price);
                        if (isNaN(price)) return null;
                        // const imageUrlsArray = item.image_urls ? JSON.parse(item.image_urls) : [];
                        let imageUrlsArray = [];

                        try {
                            if (typeof item.image_urls === 'string') {
                                const parsed = JSON.parse(item.image_urls);
                                imageUrlsArray = Array.isArray(parsed) ? parsed : JSON.parse(parsed);
                            } else if (Array.isArray(item.image_urls)) {
                                imageUrlsArray = item.image_urls;
                            } else {
                                console.error('Error: Unsupported image_urls format');
                            }
                        } catch (error) {
                            console.error('Error parsing image URLs:', error);
                        }




                        const imageUrl = imageUrlsArray.length > 0 ? imageUrlsArray[0] : 'default_image_url';

                        // return (
                        //     <React.Fragment key={item.id}>
                        //         <div className="col-span-2">
                        //             <img src={imageUrl} alt={item.name} className="w-full rounded-lg mb-2" />
                        //             <p className="font-semibold">{item.name}</p>
                        //         </div>
                        //         <div className="col-span-2">
                        //             <p>${price.toFixed(2)}</p>
                        //         </div>
                        //         <div className="col-span-2">
                        //             <p>{item.size}</p>
                        //         </div>
                        //         <div className="col-span-2">
                        //             <p>{item.quantity}</p>
                        //         </div>
                        //         <div className="col-span-2">
                        //             <p>${(price * (item.quantity ?? 0)).toFixed(2)}</p>
                        //         </div>
                        //         <div className="col-span-2">
                        //             <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        //                 onClick={() => handleRemoveFromCart(item)}
                        //             >
                        //                 Remove
                        //             </button>
                        //         </div>
                        //     </React.Fragment>
                        // );
                        return (
                            <React.Fragment key={item.id}>
                                <div className="flex flex-col md:flex-none md:col-span-2">
                                    <div className="flex md:hidden">
                                        <p className="font-semibold text-gray-700 mr-2">Product:</p>
                                    </div>
                                    <img src={imageUrl} alt={item.name} className="w-full rounded-lg mb-2" />
                                    <p className="font-semibold">{item.name}</p>
                                </div>
                                <div className="flex items-center md:items-start md:col-span-2">
                                    <div className="flex md:hidden">
                                        <p className="font-semibold text-gray-700 mr-2">Price:</p>
                                    </div>
                                    <p>${price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center md:items-start md:col-span-2">
                                    <div className="flex md:hidden">
                                        <p className="font-semibold text-gray-700 mr-2">Size:</p>
                                    </div>
                                    <p>{item.size}</p>
                                </div>
                                <div className="flex items-center md:items-start md:col-span-2">
                                    <div className="flex md:hidden">
                                        <p className="font-semibold text-gray-700 mr-2">Quantity:</p>
                                    </div>
                                    <p>{item.quantity}</p>
                                </div>
                                <div className="flex items-center md:items-start md:col-span-2">
                                    <div className="flex md:hidden">
                                        <p className="font-semibold text-gray-700 mr-2">Total:</p>
                                    </div>
                                    <p>${(price * (item.quantity ?? 0)).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center md:items-start md:col-span-2">
                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={() => handleRemoveFromCart(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </React.Fragment>
                        );
                    })
                }


                <div className="total-amount">
                    <p className="font-semibold text-gray-700">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </p>
                </div>
            </div >
            {
                !showCheckout && (
                    <button
                        onClick={() => setShowCheckout(true)}
                        className="checkout-button bg-gray-600 text-white p-4 rounded-md"
                    >
                        Checkout
                    </button>
                )
            }

            {
                showCheckout && (
                    <>
                        <button
                            onClick={() => setShowCheckout(false)}
                            className="checkout-button bg-gray-600 text-white p-4 rounded-md"
                        >
                            Back to Cart
                        </button>
                        <Checkout
                            cartItems={cartItems}
                            totalAmount={totalAmount}
                            onCheckoutSuccess={handleCheckoutSuccess}
                        />
                    </>
                )
            }
        </div >
    );
};

export default CartModal;
