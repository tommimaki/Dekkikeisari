import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import skatelogo from '../assets/skatelogo.jpeg'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">

                    <div className="h-15 w-20 bg-white rounded-full overflow-hidden">
                        <img src={skatelogo} className="w-full h-full object-cover object-center transform -translate-x-2" alt="logo" />
                    </div>
                    <p> Vaatteet </p>
                    <p> Dekit </p>
                    <p> Kengät </p>
                    {/* <Link to="/" className="text-xl font-semibold">
                        My Store
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="block lg:hidden text-white focus:outline-none"
                    >
                        {showMenu ? (
                            <FaTimes className="text-xl" />
                        ) : (
                            <FaBars className="text-xl" />
                        )}
                    </button>
                    <nav
                        className={`${showMenu ? "block" : "hidden"
                            } lg:flex lg:items-center`}
                    >
                        <Link
                            to="/"
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-10"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-10"
                        >
                            Products
                        </Link>
                        <Link
                            to="/cart"
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
                        >
                            Cart
                        </Link>
                    </nav> */}
                </div>
            </div>
        </header >
    );
};

export default Header;
