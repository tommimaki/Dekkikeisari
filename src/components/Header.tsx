import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import skatelogo from '../assets/skatelogo.jpeg'
import Cart from "./ShoppingCart/Cart";

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

                    <Link to="/" className="text-xl font-semibold">
                        Dekkikeisari
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
                            tuotteet
                        </Link>
                        <Link
                            to="/signup"
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
                        >
                            signup {'  '}
                        </Link>


                        <Cart />

                    </nav>
                </div>
            </div>
        </header >
    );
};

export default Header;
