import React, { useState, ChangeEvent, FormEvent } from 'react';
import Product from '../../interfaces/product';


interface CheckoutProps {
    cartItems: Product[]; // Add this line
    totalAmount: number; // Add this line
    onCheckoutSuccess: () => void;
}


const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalAmount, onCheckoutSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     console.log('Checkout information:', { name, email, address });
    //     alert('Checkout successful! (Demo)');
    //     onCheckoutSuccess(); // Call the onCheckoutSuccess prop
    // };

    const handleChange = (setter: (value: string) => void) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value);
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const orderInfo = {
                name,
                email,
                address,
                items: cartItems, // Add this line
                total: totalAmount, // Add this line
            };
            console.log(orderInfo)
            await submitOrder(orderInfo);
            alert("Checkout successful!");
            onCheckoutSuccess(); // Call the onCheckoutSuccess prop
        } catch (error) {
            console.error("Failed to submit order:", error);
            alert("Failed to submit order. Please try again.");
        }
    };

    async function submitOrder(orderInfo: any) {
        const response = await fetch("http://localhost:3001/orders", {
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
    );
};

export default Checkout;
