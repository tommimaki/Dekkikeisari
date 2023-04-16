import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store';
import { emptyCart } from '../../features/cart/cartSlice';


const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';
const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart?.items);
    const totalAmount = useSelector((state: RootState) => state.cart?.totalAmountReducer);
    console.log(totalAmount);


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const dispatch = useDispatch();
    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };
    // const handleRemoveFromCart = (item: Product) => {
    //     dispatch(removeFromCart(item));
    // };
    const handleCheckoutSuccess = () => {
        handleEmptyCart();
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
        <div className="checkout">
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Checkout;
