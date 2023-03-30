import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { FaTimes } from 'react-icons/fa';
import Checkout from './Checkout';
import { closeCart, emptyCart } from '../../features/cart/cartSlice'; // import the action creator



const CartModal = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCloseCart = () => {
        dispatch(closeCart()); // use the closeCart action creator
    };
    const handleEmptyCart = () => {
        dispatch(emptyCart()); // use the closeCart action creator
    };

    const handleCheckoutSuccess = () => {
        handleEmptyCart(); // Empty the cart
        handleCloseCart(); // Close the cart
    };

    useEffect(() => {
        const calculateTotal = () => {
            const total = cartItems.reduce((accumulator, item) => {
                const price = Number(item.price);
                if (isNaN(price)) return accumulator;
                return accumulator + price * (item.quantity ?? 0);
            }, 0);

            setTotalAmount(total);
        };

        calculateTotal();
    }, [cartItems]);

    return (
        <div className="cart-modal">
            <div className="flex justify-end">
                <button onClick={handleCloseCart}>
                    <FaTimes />
                </button>
            </div>
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-3">
                    <p className="font-semibold text-gray-700">Product</p>
                </div>
                <div className="col-span-3">
                    <p className="font-semibold text-gray-700">Price</p>
                </div>
                <div className="col-span-3">
                    <p className="font-semibold text-gray-700">Quantity</p>
                </div>
                <div className="col-span-3">
                    <p className="font-semibold text-gray-700">Total</p>
                </div>

                {cartItems.map((item) => {
                    const price = Number(item.price);
                    if (isNaN(price)) return null;

                    return (
                        <React.Fragment key={item.id}>
                            <div className="col-span-3">
                                <img src={item.image_url} alt={item.name} className="w-full rounded-lg mb-2" />
                                <p className="font-semibold">{item.name}</p>
                            </div>
                            <div className="col-span-3">
                                <p>${price.toFixed(2)}</p>
                            </div>
                            <div className="col-span-3">
                                <p>{item.quantity}</p>
                            </div>
                            {/* <div className="col-span-3">
                                <p>{item.size}</p>
                            </div> */}
                            <div className="col-span-3">
                                <p>${(price * (item.quantity ?? 0)).toFixed(2)}</p>
                            </div>
                        </React.Fragment>
                    );
                })}
                <div className="total-amount">
                    <p className="font-semibold text-gray-700">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>
            {!showCheckout && (
                <button
                    onClick={() => setShowCheckout(true)}
                    className="checkout-button bg-gray-600 text-white p-4 rounded-md"
                >
                    Checkout
                </button>
            )}

            {showCheckout && (
                <>
                    <button
                        onClick={() => setShowCheckout(false)}
                        className="back-to-cart-button"
                    >
                        Back to Cart
                    </button>
                    <Checkout onCheckoutSuccess={handleCheckoutSuccess} />
                </>
            )}
        </div>
    );
};

export default CartModal;
