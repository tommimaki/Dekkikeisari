import React, { useState, ChangeEvent, FormEvent } from 'react';

interface CheckoutProps {
    onCheckoutSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onCheckoutSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Checkout information:', { name, email, address });
        alert('Checkout successful! (Demo)');
        onCheckoutSuccess(); // Call the onCheckoutSuccess prop
    };

    const handleChange = (setter: (value: string) => void) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value);
    };

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
