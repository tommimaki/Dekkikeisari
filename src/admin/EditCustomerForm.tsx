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
            <form onSubmit={handleSubmit}>
                {/* Add input fields for other customer properties */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" type="text" value={updatedCustomer.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" value={updatedCustomer.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" type="text" value={updatedCustomer.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <input id="role" name="role" type="text" value={updatedCustomer.role} onChange={handleChange} />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCloseModal}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditCustomer;
