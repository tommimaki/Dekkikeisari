
import React, { useState } from 'react';
import Customer from '../interfaces/customer';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';

interface EditCustomerProps {
    customer: Customer;
    onCloseModal: () => void;
    onCustomerUpdated: () => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onCloseModal, onCustomerUpdated }) => {
    const [updatedCustomer, setUpdatedCustomer] = useState<Customer>(customer);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUpdatedCustomer({ ...updatedCustomer, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await fetch(`${BASE_API_URL}user/${updatedCustomer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCustomer),
            });
            onCustomerUpdated();
            onCloseModal();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            <div className='flex  justify-between'>

                <h2>Edit Customer</h2>
                <button onClick={onCloseModal} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    X
                </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto space-y-4">
                <input
                    type="text"
                    name="name"
                    value={updatedCustomer.name}
                    onChange={handleChange}
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={updatedCustomer.email}
                    onChange={handleChange}
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="address"
                    value={updatedCustomer.address}
                    onChange={handleChange}
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Address"
                />
                <select
                    name="role"
                    value={updatedCustomer.role}
                    onChange={handleChange}
                    className="form-select px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditCustomer;
