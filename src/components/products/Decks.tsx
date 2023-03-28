
import React, { useState, useEffect } from 'react';
interface Product {
    id: number;
    name: string;
    price: string;
    image_url: string;
}



const Decks = () => {
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products?category=Skateboards');
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div className="py-8">
            <h3 className="text-2xl font-semibold mb-4">dekit</h3>
            <p className="text-gray-700">Laaja valikoima dekkejä alan parhailta valmistajilta.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
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
