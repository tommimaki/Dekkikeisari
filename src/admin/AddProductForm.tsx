// src/admin/AddProductForm.tsx

import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
    const [name, setName] = useState('');
    // Add more states for other fields like description, price, category, and image_url

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, make a request to the API to add a product
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
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Product
            </button>
        </form>
    );
};

export default AddProductForm;
