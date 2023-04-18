import React from 'react';
import bg3rs from '../../assets/bg3rs.jpeg'
import NewIn from '../products/NewIn';
import Info from './Info';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className='min-w-full'>
                <div className="text-center mb-8">
                    <div
                        className="relative text-center mb-8 w-full h-screen bg-center bg-no-repeat bg-cover  bg-fixed"
                        style={{
                            backgroundImage: `url(${bg3rs})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute rounded-md top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-8 sm:p-">
                            <h1 className="text-xl md:text-4xl font-bold mb-4">Tervetuloa Dekkikeisariin</h1>
                            <p className="text-base md:text-md mb-8">Parhaat laudat ja vaatteet</p>
                            <a href="/products" className="bg-gray-900 text-white px-4 py-2 hover:bg-slate-400 whitespace-nowrap border-white border-2 rounded">Tutustu valikoimaan</a>
                        </div>
                    </div>
                </div>
            </div>
            <NewIn />
            <Info />
        </div>
    );

};

export default LandingPage;
