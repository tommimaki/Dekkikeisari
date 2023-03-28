// src/admin/ProductList.tsx

import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    // Add more fields like description, price, category, and image_url
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch products from the API and set the state
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <ul className="divide-y divide-gray-300">
                {products.map((product) => (
                    <li key={product.id} className="py-2">
                        {product.name}
                        {/* Display other product information */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
