import React, { useState } from 'react';
import Customer from '../interfaces/customer';

interface EditCustomerProps {
    customer: Customer;
    onCloseModal: () => void;
    onCustomerUpdated: () => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onCloseModal, onCustomerUpdated }) => {
    const [updatedCustomer, setUpdatedCustomer] = useState<Customer>(customer);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedCustomer({ ...updatedCustomer, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await fetch(`http://localhost:3001/user/${updatedCustomer.id}`, {
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
            <h2>Edit Customer</h2>
            <form className="flex flex-col w-full max-w-md mx-auto space-y-4">
                <input
                    type="text"
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Name"
                />
                <input
                    type="email"
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Password"
                />
                <input
                    type="text"
                    className="form-input px-3 py-2 border border-gray-300 rounded"
                    placeholder="Address"
                />
                <select className="form-select px-3 py-2 border border-gray-300 rounded">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>

        </div>
    );
};

export default EditCustomer;
