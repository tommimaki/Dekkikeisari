import React, { useEffect, useState } from 'react';
import Customer from '../../interfaces/customer';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from 'react-modal';
import EditCustomerForm from './EditCustomerForm';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}users`);
            const data = await response.json();
            console.log('Data:', data);
            setCustomers(data.users);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
    };

    const handleCustomerUpdated = () => {
        fetchCustomers();
    };

    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Address', field: 'address', sortable: true, filter: true },
        { headerName: 'Role', field: 'role', sortable: true, filter: true },
        {
            headerName: 'Edit/Delete',
            field: '',
            cellRendererFramework: (params: any) => (
                <div>
                    <button
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={() => handleEdit(params.data)}
                    >
                        Edit
                    </button>
                    <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => handleDelete(params.data.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        if (window.confirm(`Delete customer ${id}?`)) {
            try {
                await fetch(`${BASE_API_URL}users/${id}`, {
                    method: 'DELETE',
                });
                setCustomers(customers.filter((customer) => customer.id !== id));
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    return (
        <div className=" flex flex-col justify-center items-center">
            <h4 className="text-2xl font-bold mb-4">Asiakaslista</h4>
            <div className="ag-theme-alpine" style={{ height: '800px', width: '80%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={20}
                    suppressCellSelection={true}
                />
            </div>
            {selectedCustomer && (
                <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Edit Customer">
                    <EditCustomerForm customer={selectedCustomer} onCloseModal={closeModal} onCustomerUpdated={handleCustomerUpdated} />
                </Modal>
            )}
        </div>
    );
};

export default CustomerList;