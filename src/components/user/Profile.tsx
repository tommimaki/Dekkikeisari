import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import Breadcrumb from '../layout/BreadCrumb';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userAuth/userSlice"
import { Order } from '../../interfaces/order';
import { RootState } from '../../store';
import Product from '../../interfaces/product';
import { Link } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCreditCard,
} from "react-icons/fa";
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', address: '', id: null });
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState<Order[]>([]);
    const reduxUser = useSelector((state: RootState) => state.user);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}orders/customer/${reduxUser.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user orders');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        const fetchUserWishlist = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}wishlist/${reduxUser.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user wishlist');
                }

                const data = await response.json();
                setWishlist(data.wishlist);
            } catch (error) {
                console.error('Error fetching user wishlist:', error);
            }
        };


        if (reduxUser.user.id) {
            setUser(reduxUser.user);
            fetchUserOrders();
            fetchUserWishlist()

        }
    }, [reduxUser, reduxUser.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_API_URL}users/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to update user data");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            dispatch(updateUser(updatedUser));

            console.log("Updated user data:", user);
            setIsEditing(false);
        } catch (error) {
            console.error(`Error updating user data: ${error}`);
        }
    };

    const handleDelete = async (productId: number) => {
        try {
            console.log(productId);
            const response = await fetch(`${BASE_API_URL}wishlist/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: reduxUser.user.id, productId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete wishlist item');
            }

            // Remove the deleted item from the wishlist
            setWishlist((prevWishlist) =>
                prevWishlist.filter((item: Product) => item.id !== productId)
            );
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
        }
    };



    return (
        <div>
            <div className="max-w-7xl mx-auto p-4">
                <Breadcrumb name={'Profiili'} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:min-h-screen justify-center place-items-center   p-4">
                    <div className="bg-white p-8 rounded shadow-lg w-full text-left h-full md:max-w-md">
                        <h2 className="text-2xl text-center font-bold mb-4">Moi, {user.name}</h2>
                        <hr className="mb-20" />
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm mb-1">
                                        <FaUser className="inline-block mr-2" />
                                        Nimi:
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm mb-1">
                                        <FaEnvelope className="inline-block mr-2" />
                                        Sähköposti:
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-sm mb-1">
                                        <FaMapMarkerAlt className="inline-block mr-2" />
                                        Osoite:
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={user.address}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="card" className="block text-sm mb-1">
                                        <FaCreditCard className="inline-block mr-2" />
                                        Maksutiedot:
                                    </label>
                                    <input
                                        id="card"
                                        name="card"
                                        type="text"
                                        value="**** **** **** 1234"
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    Tallenna muutokset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 text-black px-4 py-2 ml-2 rounded hover:bg-gray-400 focus:outline-none"
                                >
                                    Peruuta
                                </button>
                            </form>
                        ) : (
                            <div>
                                <p className="mb-2">
                                    <span className="font-semibold"><FaUser className="inline-block mr-2" /> Nimi:</span> {user.name}
                                </p>
                                <hr className="mb-4" />
                                <p className="mb-2">
                                    <span className="font-semibold"><FaEnvelope className="inline-block mr-2" /> Sähköposti:</span> {user.email}
                                </p>
                                <hr className="mb-4" />
                                <p className="mb-2">
                                    <span className="font-semibold"><FaMapMarkerAlt className="inline-block mr-2" /> Osoite:</span> {user.address}
                                </p>
                                <hr className="mb-4" />
                                <p className="mb-4">
                                    <span className="font-semibold"><FaCreditCard className="inline-block mr-2" /> Maksutiedot:</span> **** **** **** 1234
                                </p>
                                <hr className="mb-4" />
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    Muokkaa profiilia
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded shadow-lg w-full text-left h-full md:max-w-md">
                        <h2 className="text-2xl text-center font-bold mb-4">Sinun Tilauksesi:</h2>
                        {orders.length > 0 ? (
                            <ul>
                                {orders.map((order) => (
                                    <li
                                        key={order.id}
                                        className="p-4 mb-4 bg-gray-100 rounded shadow"
                                    >
                                        <p>
                                            <strong>Tilaus ID:</strong> {order.id}
                                        </p>
                                        <p>
                                            <strong>Summa:</strong> {order.total}€
                                        </p>
                                        <p>
                                            <strong>Tilauksen status:</strong> {order.status}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ei tilauksia, vielä</p>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded shadow-lg w-full text-left h-full md:max-w-md">
                        <h2 className="text-2xl text-center font-bold mb-4">Sinun Toivelista:</h2>
                        {wishlist.length > 0 ? (
                            <ul>
                                {wishlist.map((product: Product) => (
                                    <div className='p-4 mb-4 bg-gray-100 justify-between rounded shadow flex'>
                                        <li
                                            key={product.id}
                                        >
                                            <div>
                                                <p>
                                                    <strong>Nimi:</strong> {product.name}
                                                </p>
                                                <p>
                                                    <strong>Hinta:</strong> {product.price}€
                                                </p>
                                            </div>
                                        </li>
                                        <div className='flex flex-col gap-1'>

                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 self-center rounded-lg">
                                                <Link to={`/products/${product.id}`} key={product.id}>
                                                    tuotesivu
                                                </Link>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                poista
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>Ei tuotteita toivelistalla, vielä</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Profile;


