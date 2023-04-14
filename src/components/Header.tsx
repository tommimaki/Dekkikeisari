import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import skatelogo from '../assets/skatelogo.jpeg'
import Cart from "./ShoppingCart/Cart";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { logout } from "../features/userAuth/userSlice";


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //conditional rendering for adminpanel if user is admin
    const user = useSelector((state: RootState) => state.user);
    const userRole = user.user?.role;
    const isAdmin = userRole === 'admin';

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClose = () => {
        setShowMenu(false);
    };

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">

                    <Link to="/">
                        <div className="h-15 w-20 bg-white rounded-full overflow-hidden">
                            <img src={skatelogo} className="w-full h-full object-cover object-center transform -translate-x-2" alt="logo" />
                        </div>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="block lg:hidden text-white focus:outline-none"
                    >
                        {showMenu ? (
                            ""
                        ) : (
                            <FaBars className="text-xl" />
                        )}
                    </button>

                    <nav
                        className={`${showMenu ? "fullScreenMenu block" : "hidden"
                            } lg:flex lg:items-center l:flex items-center justify-between`}
                    >
                        <button
                            onClick={toggleMenu}
                            className="absolute top-4 right-4 lg:hidden text-white focus:outline-none"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <div className="lg:flex lg:items-center l:flex items-center justify-between">
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setShowMenu(false)}
                                    className={`block ${showMenu ? "mt-10" : "mt-4"} lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-10`}
                                >
                                    Admin Panel
                                    {showMenu && <hr className="mb-5" />}
                                </Link>
                            )}
                            <Link
                                to="/"
                                onClick={() => setShowMenu(false)}
                                className={`block ${showMenu ? "mt-10" : "mt-4"} lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-10`}
                            >
                                Etusivu
                                {showMenu && <hr className="mb-5" />}
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setShowMenu(false)}
                                className={`block ${showMenu ? "mt-10" : "mt-4"} lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-10`}
                            >
                                Tuotteet
                                {showMenu && <hr className="mb-5" />}
                            </Link>

                            {isLoggedIn ? (
                                <div>
                                    <Link
                                        to="/profile"
                                        onClick={() => setShowMenu(false)}
                                        className={`block ${showMenu ? "mt-10" : "mt-0"} lg:inline-block  mr-10 text-white hover:text-gray-400`}
                                    >
                                        Profiili
                                        {showMenu && <hr className="mb-5" />}
                                    </Link>
                                    <Link
                                        onClick={() => setShowMenu(false)}
                                        to="/landingPage">
                                        <button
                                            className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                            onClick={handleLogout}>
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Kirjaudu ulos
                                            </span>
                                        </button>
                                        {showMenu && <div className="mb-5" />}

                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        onClick={() => setShowMenu(false)}
                                        className={`block ${showMenu ? "mt-10" : "mt-4"} lg:inline-block lg:mt-0 mr-10 text-white hover:text-gray-400`}
                                    >
                                        Rekisteröidy
                                        {showMenu && <hr className="mb-5" />}
                                    </Link>
                                    <Link
                                        to="/signin"
                                        onClick={() => setShowMenu(false)}
                                        className={`block ${showMenu ? "mt-10" : "mt-4"} lg:inline-block lg:mt-0 mr-10 text-white hover:text-gray-400`}
                                    >
                                        <button
                                            className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Kirjaudu sisään
                                            </span>

                                        </button>
                                        {showMenu && <div className="mb-10" />}
                                    </Link>
                                </>
                            )}
                            <Cart handleClose={handleClose} />
                            {showMenu && <hr className="mb-5" />}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};



export default Header;
