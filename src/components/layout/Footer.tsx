import React from 'react';


const Footer = () => {
    return (

        <footer className="bg-white shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex items-center justify-center w w-full">
                    <ul className="flex flex-wrap  md:flex-row pr-4 sm:flex-col items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 justify-center">
                        <li>
                            <a href="https://www.tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline  pr-4">Yhteystiedot</a>
                        </li>
                        <li>
                            <a href="https://www.tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Toimitusehdot</a>
                        </li>
                        <li>
                            <a href="https://www.tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Asiakaspalautukset</a>
                        </li>
                        <li>
                            <a href="https://www.tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Tietosuojaseloste</a>
                        </li>
                        <li>
                            <a href="https://www.tommimaki.com" target="_blank" rel="noopener noreferrer" className="hover:underline pr-4">Dekkikeisari Forum</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="text-sm text-gray-500 text-center dark:text-gray-400 justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                        <div>
                            <p>
                                Katuosoite 123<br />
                                Ma-Pe: 10-19<br />
                                La: 10-18<br />
                                Su: 12-17<br />
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong >Asiakastuki </strong> <br />
                                050 2345 678<br />
                                info@dekkikeisari.fi<br />
                            </p>
                        </div>
                        <div>
                            <p>
                                Dekkikeisari Verkkokauppa<br />
                                www.dekkikeisari.fi<br />

                                verkkokauppa@dekkikeisari.fi<br />
                            </p>
                        </div>
                        <div className="md:col-span-3 ">
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                            <p>© 2023 Dekkikeisari. Kaikki oikeudet pidätetään.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>



    );
};

export default Footer;

