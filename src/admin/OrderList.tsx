import React, { useEffect, useState } from 'react';
import { Order, ProductInOrder, Customer } from '../interfaces/order';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: 0,
        status: '',
    });

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


    const handleEdit = (orderId: number) => {
        const order = orders.find((order) => order.id === orderId);
        if (order) {
            setEditFormData({ id: order.id, status: order.status });
            setIsEditing(true);
        }
    };

    const closeModal = () => {
        setIsEditing(false);
    };


    const handleDelete = async (orderId: number) => {
        // Show a confirmation window
        const confirmDelete = window.confirm(`Are you sure you want to delete order ${orderId}?`);
        if (confirmDelete) {
            try {
                await fetch(`http://localhost:3001/orders/${orderId}`, {
                    method: 'DELETE',
                });
                setOrders(orders.filter((order) => order.id !== orderId));
            } catch (error) {
                console.log('Error deleting order:', error);
            }
        }
    };


    const handleEditFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/orders/${editFormData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: editFormData.status }),
            });
            const responseData = await response.json();
            const updatedOrder = {
                ...responseData.order,
                products: JSON.parse(responseData.order.products),
            };
            setOrders(
                orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
            );
            setIsEditing(false);
        } catch (error) {
            console.log('Error updating order:', error);
        }
    };


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
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Actions',
            field: '',
            cellRendererFramework: (params: any) => (
                <div>
                    <button
                        onClick={() => handleEdit(params.data.id)}
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(params.data.id)}
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
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
            {isEditing && (
                <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleEditFormSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Edit Order {editFormData.id}
                                        </h3>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="status"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={editFormData.status}
                                                onChange={handleEditFormChange}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    onClick={handleEditFormSubmit}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
