import React, { useEffect, useState } from 'react';
import { Order, ProductInOrder, Customer } from '../interfaces/order';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


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


    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Customer', field: 'customer_id' },
        {
            headerName: 'Products',
            field: 'products',
            cellRendererFramework: (params: any) => (
                <div>
                    {params.value.map((product: ProductInOrder) => (
                        <div key={product.productId}>
                            Product ID: {product.productId} (Quantity: {product.quantity})
                        </div>
                    ))}
                </div>
            ),
        },
        { headerName: 'Total', field: 'total' },
        { headerName: 'Shipping Address', field: 'shipping_address' },
    ];


    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>

            <div className="ag-theme-alpine" style={{ height: '800px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={orders}
                    pagination={true}
                    paginationPageSize={20}
                    suppressCellSelection={true}
                />
            </div>

        </div>
    );
};

export default OrderList;
