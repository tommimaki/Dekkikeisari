import React from 'react';
import Breadcrumb from '../../components/layout/BreadCrumb';

import OrderList from './OrderList';
const Orders: React.FC = () => {
    return (
        <div>
            <Breadcrumb category='admin' name='tilaukset' />
            <OrderList />
        </div>
    );
};

export default Orders;
