import React from 'react';
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import Orders from './Orders';
import ProductManagement from './ProductManagement';
import CustomerManagement from './CustomerManagement';
import Breadcrumb from '../components/BreadCrumb';

const AdminPanel: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div style={{ minHeight: '500px' }}>
            <Breadcrumb category='admin' />

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
                <nav className="mb-8 flex justify-center">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/admin/orders"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/orders')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-blue-600 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/product-management"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/product-management')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-blue-600 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                Product Management
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/customer-management"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/customer-management')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-blue-600 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
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
        </div>

    );
};

export default AdminPanel;
