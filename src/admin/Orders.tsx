import React from 'react';
import Breadcrumb from '../components/BreadCrumb';

import OrderList from './OrderList';
const Orders: React.FC = () => {
    return (
        <div>
            <Breadcrumb category='admin' name='tilaukset' />
            <h2>Orders Management</h2>
            <OrderList />
        </div>
    );
};

export default Orders;
