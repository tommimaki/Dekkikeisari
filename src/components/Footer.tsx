import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Dekkikeisari</h3>
                        <p>1234 Example Street</p>
                        <p>Helsinki, 00000</p>
                        <p>Finland</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Linkit</h3>
                        <ul>
                            <li><a href="#!" className="hover:text-blue-400">Etusivu</a></li>
                            <li><a href="#!" className="hover:text-blue-400">Tuotteet</a></li>
                            <li><a href="#!" className="hover:text-blue-400">Yhteystiedot</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Yhteystiedot</h3>
                        <p>Puh: +358 123 456 789</p>
                        <p>Email: info@skateshop.fi</p>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Skate Shop. Kaikki oikeudet pidätetään.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
