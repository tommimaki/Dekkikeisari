import React from 'react';
import CustomerList from './CustomerList';
import Breadcrumb from '../../components/BreadCrumb';
const CustomerManagement: React.FC = () => {
    return (
        <div>
            <Breadcrumb category='admin' name='Asiakkaat' />
            <h2>Käyttäjähallinta</h2>
            <CustomerList />
        </div>
    );
};

export default CustomerManagement;
