import React from 'react';

const products = [
    { id: 1, name: 'Rullalauta A', image: 'https://via.placeholder.com/200', price: '99.99 €' },
    { id: 2, name: 'Rullalauta B', image: 'https://via.placeholder.com/200', price: '109.99 €' },
    { id: 3, name: 'Rullalauta C', image: 'https://via.placeholder.com/200', price: '119.99 €' },
    { id: 3, name: 'Rullalauta C', image: 'https://via.placeholder.com/200', price: '119.99 €' },

    // Add more products
];

const Decks = () => {
    return (
        <div className="py-8">
            <h3 className="text-2xl font-semibold mb-4">dekit</h3>
            <p className="text-gray-700">Laaja valikoima dekkejä alan parhailta valmistajilta.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-700 mb-4">{product.price}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Lisää ostoskoriin</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Decks;
