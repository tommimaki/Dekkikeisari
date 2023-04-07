// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Product from '../../interfaces/product';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// interface CheckoutProps {
//     cartItems: Product[];
//     totalAmount: number;
//     onCheckoutSuccess: () => void;
// }


// const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalAmount, onCheckoutSuccess }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');


//     const user = useSelector((state: RootState) => state.user.user);
//     console.log(user);





//     const handleChange = (setter: (value: string) => void) => (
//         e: ChangeEvent<HTMLInputElement>
//     ) => {
//         setter(e.target.value);
//     };
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const orderInfo = {
//                 customerId: 1, // You should replace this with the actual customer ID from your system
//                 products: cartItems.map((item) => ({
//                     productId: item.id,
//                     price: item.price,
//                     quantity: 1, // You should replace this with the actual quantity of the item in the cart
//                 })),
//                 total: totalAmount,
//                 shippingAddress: address,
//             };
//             console.log(orderInfo);
//             await submitOrder(orderInfo);
//             alert("Checkout successful!");
//             onCheckoutSuccess(); // Call the onCheckoutSuccess prop
//         } catch (error) {
//             console.error("Failed to submit order:", error);
//             alert("Failed to submit order. Please try again.");
//         }
//     };


//     async function submitOrder(orderInfo: any) {
//         const response = await fetch("http://localhost:3001/orders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(orderInfo),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to submit order");
//         }

//         return await response.json();
//     }


//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <h2 className="text-lg font-bold mb-4">Checkout</h2>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={handleChange(setName)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={handleChange(setEmail)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <input
//                 type="text"
//                 placeholder="Address"
//                 value={address}
//                 onChange={handleChange(setAddress)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <button
//                 type="submit"
//                 className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default Checkout;
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Product from '../../interfaces/product';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// interface CheckoutProps {
//     cartItems: Product[]; // Add this line
//     totalAmount: number; // Add this line
//     onCheckoutSuccess: () => void;
// }

// const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalAmount, onCheckoutSuccess }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');

//     // console.log(user);


//     const user = useSelector((state: RootState) => state.user.user);
//     const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
//     console.log(isLoggedIn, 'islogged?');
//     console.log(user, 'user');




//     const handleChange = (setter: (value: string) => void) => (
//         e: ChangeEvent<HTMLInputElement>
//     ) => {
//         setter(e.target.value);
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const orderInfo = {
//                 customerId: user.id || 1,
//                 products: cartItems.map((item) => ({
//                     productId: item.id,
//                     price: item.price,
//                     quantity: 1,
//                 })),
//                 total: totalAmount,
//                 shippingAddress: address,
//                 name: name,
//                 email: email,
//             };

//             await submitOrder(orderInfo);

//             console.log(orderInfo)
//             alert("Checkout successful!");
//             onCheckoutSuccess();
//         } catch (error) {
//             console.error("Failed to submit order:", error);
//             alert("Failed to submit order. Please try again.");
//         }
//     };


//     async function submitOrder(orderInfo: any) {
//         const response = await fetch("http://localhost:3001/orders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(orderInfo),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to submit order");
//         }

//         return await response.json();
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <h2 className="text-lg font-bold mb-4">Checkout</h2>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={user?.name ?? name}
//                 onChange={handleChange(setName)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={user?.email ?? email}
//                 onChange={handleChange(setEmail)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <input
//                 type="text"
//                 placeholder="Address"
//                 value={user?.address ?? address}
//                 onChange={handleChange(setAddress)}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             <button
//                 type="submit"
//                 className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default Checkout;

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Product from '../../interfaces/product';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Define interface for CheckoutProps
interface CheckoutProps {
    cartItems: Product[];
    totalAmount: number;
    onCheckoutSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalAmount, onCheckoutSuccess }) => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const user = useSelector((state: RootState) => state.user.user);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    // Update local state when the Redux user state changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const handleChange = (setter: (value: string) => void) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const orderInfo = {
                customerId: user.id || 1,
                products: cartItems.map((item) => ({
                    productId: item.id,
                    price: item.price,
                    quantity: 1,
                })),
                total: totalAmount,
                shippingAddress: address,
                name: name,
                email: email,
            };

            // Add log statements to debug the issue
            console.log("User object:", user);
            console.log("Name, email, address:", name, email, address);
            console.log("Order info:", orderInfo);

            await submitOrder(orderInfo);

            console.log(orderInfo);
            alert("Checkout successful!");
            onCheckoutSuccess();
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
