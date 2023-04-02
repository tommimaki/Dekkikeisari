import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import OrderList from './OrderList';
import ProductList from './ProductList';
import Orders from './Orders';
import ProductManagement from './ProductManagement';
import CustomerManagement from './CustomerManagement';

const AdminPanel: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <nav className="mb-8">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/admin/orders" className="text-blue-600 hover:text-blue-800">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/product-management" className="text-blue-600 hover:text-blue-800">
                            Product Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customer-management" className="text-blue-600 hover:text-blue-800">
                            Customer Management
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/product-management" element={<ProductManagement />} />
                <Route path="/admin/customer-management" element={<CustomerManagement />} />
            </Routes>
        </div>
    );
};

export default AdminPanel;
