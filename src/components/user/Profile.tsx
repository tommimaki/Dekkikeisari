import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', address: '', id: null });
    const [isEditing, setIsEditing] = useState(false);
    // Fetch user data from the server when the component mounts
    useEffect(() => {
        fetchUserData().then((userData) => setUser(userData));
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:3001/users/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const userData = await response.json();
            console.log("Fetched user data:", userData);

            //sets empty string if datafield null
            const propertiesToCheck = ["name", "email", "address", "id"];
            propertiesToCheck.forEach((property) => {
                if (userData[property] === undefined) {
                    console.log(property)
                    userData[property] = '';
                }
            });
            return userData;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/users/user", {
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

            const updatedUser = await response.json(); // updated user data from the response
            setUser(updatedUser); // Update the local state with the updated user data

            console.log("Updated user data:", user);
            setIsEditing(false);
        } catch (error) {
            console.error(`Error updating user data: ${error}`);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white min-h-screen p-8 rounded shadow-lg w-full text-left max-w-md">
                <h2 className="text-2xl text-center font-bold mb-4">Hi, {user.name}</h2>
                <hr className="mb-20" />
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm mb-1">
                                <FaUser className="inline-block mr-2" />
                                Name:
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
                                Email:
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
                                Address:
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
                                Payment Information:
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
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-black px-4 py-2 ml-2 rounded hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                        <p className="mb-2">
                            <span className="font-semibold"><FaUser className="inline-block mr-2" /> Name:</span> {user.name}
                        </p>
                        <hr className="mb-4" />
                        <p className="mb-2">
                            <span className="font-semibold"><FaEnvelope className="inline-block mr-2" /> Email:</span> {user.email}
                        </p>
                        <hr className="mb-4" />
                        <p className="mb-2">
                            <span className="font-semibold"><FaMapMarkerAlt className="inline-block mr-2" /> Address:</span> {user.address}
                        </p>
                        <hr className="mb-4" />
                        <p className="mb-4">
                            <span className="font-semibold"><FaCreditCard className="inline-block mr-2" /> Payment Information:</span> **** **** **** 1234
                        </p>
                        <hr className="mb-4" />
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;