import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import Modal from 'react-modal';
import Breadcrumb from '../components/BreadCrumb';


Modal.setAppElement('#root'); //root element to be accessible to screen readers

const ProductManagement: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Breadcrumb category='admin' name='tuotteet' />
            <h2>Product Management</h2>
            <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={handleOpenModal}>Lisää tuotteita</button>
            <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
                <AddProductForm onCloseModal={handleCloseModal} />
            </Modal>
            <ProductList />
        </div >
    );
};

export default ProductManagement;
