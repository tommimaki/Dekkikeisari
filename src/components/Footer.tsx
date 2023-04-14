import React from 'react';
import skatelogo from '../assets/skatelogo.jpeg'

const Footer = () => {
    return (
        <footer className="bg-white  shadow dark:bg-gray-900 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://tommimaki.com" target="_blank" className="flex items-center mb-4 sm:mb-0">
                        <img src={skatelogo} className="h-8 rounded mr-3" alt="skate Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dekkikeisari</span>
                    </a>
                    <ul className="flex flex-wrap pr-4 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="https://tommimaki.com" target="_blank" rel="noopener noreferrer" className=" hover:underline pr-4">About</a>
                        </li>
                        <li>
                            <a href="https://tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="https://tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Licensing</a>
                        </li>
                        <li>
                            <a href="https://tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://tommimaki.com" className="hover:underline">Tommi Mäki</a>. All Rights Reserved.</span>
            </div>
        </footer >


    );
};

export default Footer;

