import React from 'react';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

const ProductManagement: React.FC = () => {
    return (
        <div>
            <h2>Product Management</h2>
            {/* Add your Product management code here */}
            <AddProductForm />
            <ProductList />
        </div>
    );
};

export default ProductManagement;
