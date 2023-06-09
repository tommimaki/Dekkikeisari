import React from 'react';
import CustomerList from './CustomerList';
import Breadcrumb from '../../components/layout/BreadCrumb';
const CustomerManagement: React.FC = () => {
    return (
        <div>
            <Breadcrumb category='admin' name='Asiakkaat' />
            <h2 className='text-center'>Käyttäjähallinta</h2>
            <CustomerList />
        </div>
    );
};

export default CustomerManagement;
