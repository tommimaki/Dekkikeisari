import React from 'react';
import Decks from './products/Decks';
import Shoes from './products/Shoes';
import Shirts from './products/Shirts';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Tervetuloa Dekkikeisariin</h1>
                <p className="text-xl">Parhaat laudat ja vaatteet</p>
            </div>

            <div className=" grid grid-cols-1  md:grid-cols-1 gap-4">
                <div className="bg-white p-6  rounded-lg w-screen shadow-md">
                    <Decks />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">


                    <Shoes />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">

                    <Shirts />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Oheistuotteet</h3>
                    <p className="text-gray-700">Rullalautailuun liittyvät tarvikkeet ja lisäosat.</p>
                </div>
            </div>

            <div className="mt-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Tutustu valikoimaan</button>
            </div>
        </div>
    );
};

export default LandingPage;
