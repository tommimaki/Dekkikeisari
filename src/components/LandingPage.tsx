import React from 'react';
// import Decks from './products/Decks';
// import Shoes from './products/Shoes';
// import Shirts from './products/Shirts';
import skater1 from '../assets/skater1.jpg'
import NewIn from './products/NewIn';
import Info from './Info';
import Welcome from './user/Welcome';
const LandingPage = () => {
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <div className="relative text-center mb-8">
                    <img src={skater1} alt="Skater" />
                    <div className="absolute rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-8">
                        <h1 className="text-4xl font-bold mb-4">Tervetuloa Dekkikeisariin</h1>
                        <p className="text-xl mb-8">Parhaat laudat ja vaatteet</p>
                        <a href="/products" className="bg-gray-900 text-white px-4 py-2 hover:bg-slate-400 rounded">Tutustu valikoimaan</a>
                    </div>
                </div>
            </div>
            <Welcome />
            <div className="grid grid-cols-1  md:grid-cols-1 gap-4  " >
                <div className="bg-white p-6  rounded-lg w-screen   ">
                    <NewIn />
                </div>

            </div>
            <Info />

        </div >
    );
};

export default LandingPage;
