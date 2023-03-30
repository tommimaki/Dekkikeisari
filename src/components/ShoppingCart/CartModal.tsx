import React from 'react';
import { useSelector } from 'react-redux';

import Product from '../../interfaces/product';

import { RootState } from '../../store'; // import your root state type
const CartModal = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className="cart-modal">
            <h2>Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => {
                        const price = Number(item.price);
                        if (isNaN(price)) return null;
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(price * (item.quantity ?? 0)).toFixed(2)}</td>
                            </tr>
                        );
                    })}


                </tbody>
            </table>
        </div>
    );
}

export default CartModal;
