import React, { useState, FormEvent } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

const Info = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${BASE_API_URL}newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Subscription successful:', data);
                setSuccessMessage('Subscription successful. Thank you for subscribing!');
                setEmail('');
            } else {
                const error = await response.json();
                console.log('Subscription failed:', error);
                setErrorMessage('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };
    return (
        <div className=" bg-gray-700 text-white w-full p">
            <div className="container mx-auto px-4 flex flex-col  items-center  lg:flex-row justify-between">
                <div className="lg:w-1/2 mb-6 mx-6 items-center justify-center lg:mb-0">
                    <h2 className="md:text-4xl text-xl text-center font-semibold my-4">Moikka, olemme Dekkikeisari, skeittikauppa stadista!</h2>
                    <p className="text-white text-md text-center md:text-xl mb-4">
                        Myymme streetwear-vaatteita ja skeittilautoja. Tee tilaus netissä tai tule moikkaamaan
                        liikkeeseemme!
                    </p>
                    <section className="bg-white rounded dark:bg-gray-900">
                        <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
                            <div className="mx-auto max-w-screen-md sm:text-center">
                                <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center dark:text-white">Tilaa Uutiskirjeemme!</h2>
                                <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400"> Pysy perillä siitä milloin meille tulee uutta tavaraa myyntiin ja saa mahtavia alennuksia!</p>
                                <form onSubmit={handleSubscribe}>
                                    <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                        <div className="relative w-full">
                                            <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sähköposti</label>
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                            </div>
                                            <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="esimerkki@mail.com" type="email" id="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                        </div>
                                        <div>
                                            <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tilaa!</button>
                                        </div>
                                    </div>
                                </form>
                                {successMessage && (
                                    <p className="text-green-600 text-md text-center mt-4">{successMessage}</p>
                                )}
                                {errorMessage && (
                                    <p className="text-red-600 text-md text-center mt-4">{errorMessage}</p>
                                )}

                            </div>
                        </div>
                    </section>

                </div>
                <div className="w-full lg:w-1/2 mb-20 lg:my-10">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-600 mr-2" />
                            <div className="text-gray-700">
                                <p className="font-semibold text-left">Osoite:</p>
                                <p>Katuosoite 123</p>
                                <p>00100 Helsinki</p>
                            </div>
                        </div>
                        <div>
                            <div className="map-container">
                                <iframe
                                    title="Google Maps - Kamppi, Helsinki"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7939.465494145467!2d24.923580297014965!3d60.166390986204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920a34d032778f%3A0x2600b5523c1977b1!2sKamppi%2C%20Helsinki!5e0!3m2!1sfi!2sfi!4v1680177754827!5m2!1sfi!2sfi"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="map"
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
