import React, { useEffect, useState } from 'react';
import { Order, ProductInOrder, Customer } from '../interfaces/order';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/orders');
                const data = await response.json();

                // Parse the products field
                const parsedOrders = data.orders.map((order: any) => {
                    return {
                        ...order,
                        products: JSON.parse(order.products),
                    };
                });

                setOrders(parsedOrders);
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Shipping Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_id}</td>
                            <td>
                                {order.products.map((product) => (
                                    <div key={product.productId}>
                                        Product ID: {product.productId} (Quantity: {product.quantity})
                                    </div>
                                ))}
                            </td>
                            <td>{order.total}</td>
                            <td>{order.shipping_address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
