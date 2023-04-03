import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import CartModal from './CartModal';
import { RootState } from '../../store';
import { openCart, closeCart } from '../../features/cart/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart?.items);
    const isOpen = useSelector((state: RootState) => state.cart?.isOpen);

    const dispatch = useDispatch();

    const handleOpenCart = () => {
        dispatch(openCart());
    };

    const handleCloseCart = () => {
        dispatch(closeCart());
    };

    return (
        <div className="cart  mt-4">
            <div className="flex items-center">
                <button onClick={handleOpenCart} className="flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <span>({cartItems.length})</span>
                </button>
            </div>

            <Modal isOpen={isOpen} onRequestClose={handleCloseCart}>
                <CartModal />
            </Modal>
        </div>
    );
}

export default Cart;