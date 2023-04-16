import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store';
import { emptyCart } from '../../features/cart/cartSlice';
import Product from '../../interfaces/product';
import { useNavigate } from 'react-router-dom';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart?.items);
    const totalAmount = useSelector((state: RootState) => state.cart?.totalAmountReducer);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [orderComplete, setOrderComplete] = useState<boolean>(false);
    const dispatch = useDispatch();
    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };
    // const handleRemoveFromCart = (item: Product) => {
    //     dispatch(removeFromCart(item));
    // };
    const handleCheckoutSuccess = () => {
        handleEmptyCart();
        setOrderComplete(true);
    };

    const redirectToHomePage = () => {
        navigate('/');
    };

    const user = useSelector((state: RootState) => state.user.user);
    // Update local state when the Redux user state changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const handleChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const orderInfo = {
                customerId: user?.id || 1,
                products: cartItems.map((item: any) => ({
                    productId: item.id,
                    price: item.price,
                    quantity: 1,
                })),
                total: totalAmount,
                shippingAddress: address,
                name: name,
                email: email,
            };

            await submitOrder(orderInfo);

            alert("Checkout successful!");
            handleCheckoutSuccess();
        } catch (error) {
            console.error("Failed to submit order:", error);
            alert("Failed to submit order. Please try again.");
        }
    };

    async function submitOrder(orderInfo: any) {
        console.log(orderInfo);

        const response = await fetch(`${BASE_API_URL}orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderInfo),
        });

        if (!response.ok) {
            throw new Error("Failed to submit order");
        }

        return await response.json();
    }

    return (
        <div className="checkout min-h-screen grid grid-cols-1 px-10 md:grid-cols-2 py-10 justify-center  gap-8">
            {orderComplete ? (
                <>
                    <div>
                        <h2 className="text-lg font-bold mb-4">Order Complete</h2>
                        <p>Thank you for your purchase! Here are the details of your order:</p>
                        <div className="cart-summary mb-4">
                            {cartItems.map((item: Product) => (
                                <div key={item.id} className="grid grid-cols-2 gap-2 mb-2">
                                    <span>{item.name} - {item.size}</span>
                                    <span>× 1</span>
                                    <span>€{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={redirectToHomePage}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Continue Shopping
                    </button>
                </>
            ) : (
                <div className="checkout min-h-screen grid grid-cols-1 px-10 md:grid-cols-2 py-10 justify-center  gap-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-lg font-bold mb-4">Checkout</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange(setName)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange(setEmail)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleChange(setAddress)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Tee tilaus
                        </button>
                    </form>
                    <div className="order-summary">
                        <h2 className="text-lg font-bold mb-4">TILAUKSESI</h2>
                        <div className="cart-summary mb-4">
                            {cartItems.map((item: Product) => (
                                <div key={item.id} className="grid grid-cols-2 gap-2 mb-2">
                                    <span>{item.name} - {item.size}</span>
                                    <span>× 1</span>
                                    <span>€{item.price}</span>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="delivery-options flex flex-col my-4">
                            <h3 className="font-semibold mb-2">Toimitustapa:</h3>
                            <label className="delivery-option-label inline-flex items-center mr-4">
                                <input type="radio" className="delivery-option-input" name="delivery-option" value="Posti" />
                                <span className="delivery-option-text ml-2">Posti</span>
                            </label>
                            <label className="delivery-option-label inline-flex items-center mr-4">
                                <input type="radio" className="delivery-option-input" name="delivery-option" value="Matkahuolto" />
                                <span className="delivery-option-text ml-2">Matkahuolto</span>
                            </label>
                            <label className="delivery-option-label inline-flex items-center mr-4">
                                <input type="radio" className="delivery-option-input" name="delivery-option" value="Nouto - Myymälä, Forum" />
                                <span className="delivery-option-text ml-2">Nouto - Myymälä, Kamppi</span>
                            </label>
                        </div>
                        <hr />
                        <p className="font-semibold">Yhteensä: €{totalAmount.toFixed(2)} (sisältää €{(totalAmount * 0.24).toFixed(2)} ALV)</p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Checkout;
