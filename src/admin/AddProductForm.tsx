import React, { useState } from 'react';



const API_URL = 'http://localhost:3001/products/add'; // Replace with your API URL

async function addProduct(product: any) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
    }

    return await response.json();
}

const AddProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image_url, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const product = {
                name,
                description,
                price,
                category,
                image_url,
            };

            const result = await addProduct(product);
            console.log('Product added successfully:', result);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            {/* Add more input fields for other fields like description, price, category, and image_url */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="image_url" className="block text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    id="image_url"
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Product
            </button>
        </form>
    );
};

export default AddProductForm;
