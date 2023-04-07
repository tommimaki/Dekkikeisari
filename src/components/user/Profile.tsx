import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', id: null });

    const [isEditing, setIsEditing] = useState(false);
    // const token = useSelector((state: RootState) => state.auth.token);

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
            if (userData.name === undefined) {
                userData.name = '';
            }
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
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Hi, {user.name}</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm mb-1">
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
                            <span className="font-semibold">Name:</span> {user.name}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>
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
