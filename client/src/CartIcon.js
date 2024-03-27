import React from 'react';
import { Link } from 'react-router-dom';
import shoppingCartImage from './shopping-cart.png'; 
import './CartIcon.css'; 

const CartIcon = ({ cartCount }) => {
    return (
        <div className="cart-icon">
            <Link to="/cart">
                <span className="cart-count">{cartCount}</span> 
                <img src={shoppingCartImage} alt="Shopping Cart" className="cart-image" />
            </Link>
        </div>
    );
};

export default CartIcon;
