import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Info = () => {
    return (
        <div className=" bg-gray-700 text-white w-full p-10">
            <div className="container mx-auto px-4 flex flex-col  items-center  lg:flex-row justify-between">
                <div className="lg:w-1/2 mb-6 mx-10  content-center  lg:mb-0">
                    <h2 className="text-4xl font-semibold mb-20">Moikka, olemme Dekkikeisari, skeittikauppa stadista!</h2>
                    <p className="text-white text-xl mb-4">
                        Myymme streetwear-vaatteita ja skeittilautoja. Tee tilaus netissä tai tule moikkaamaan
                        liikkeeseemme!  (palkatkaa mut T:tommi)
                    </p>

                    <div className="mt-8">
                        <Link to="/products">
                            <button className="bg-gray-900 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded">
                                Tutustu koko valikoimaan
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="bg-white p-10 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-600 mr-2" />
                            <div className="text-gray-700">
                                <p className="font-medium text-left">Osoite:</p>
                                <p>Katuosoite 123</p>
                                <p>00100 Helsinki</p>
                            </div>
                        </div>
                        <div>
                            <div className="map-container">
                                <iframe
                                    title="Google Maps - Kamppi, Helsinki"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7939.465494145467!2d24.923580297014965!3d60.166390986204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920a34d032778f%3A0x2600b5523c1977b1!2sKamppi%2C%20Helsinki!5e0!3m2!1sfi!2sfi!4v1680177754827!5m2!1sfi!2sfi"
                                    width="600"
                                    height="500"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="map w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Info;
