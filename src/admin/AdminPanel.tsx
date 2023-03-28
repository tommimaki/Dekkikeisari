// src/admin/AdminPanel.tsx

import React from 'react';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

const AdminPanel: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AddProductForm />
                <ProductList />
            </div>
        </div>
    );
};

export default AdminPanel;
