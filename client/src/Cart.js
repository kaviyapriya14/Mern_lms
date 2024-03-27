import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { useTotalPrice } from './TotalPriceContext';

const CartPage = ({ cartItems, removeFromCart }) => {
    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };
    
    const { totalPrice, setTotalPrice } = useTotalPrice();

    React.useEffect(() => {
        const totalPrice = cartItems
            .filter(item => item.priceTier !== 'Free')
            .reduce((acc, item) => {
                const price = parseFloat(item.priceTier?.replace('$', '') || 0);
                return acc + price;
            }, 0);
        setTotalPrice(totalPrice);
    }, [cartItems, setTotalPrice]);
    
    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <li key={item._id}>
                            <img src={item.courseImage} alt={item.courseTitle} />
                            <span>{item.courseTitle}</span>
                            <span>{item.courseDescription}</span>
                            <span>{item.currency} {item.priceTier}</span>
                            <Link style={{border:'none',color:'red',backgroundColor:'none'}} onClick={() => handleRemoveFromCart(item._id)}>Remove</Link>
                        </li>
                    ))
                ) : (
                    <li>No items in cart</li>
                )}
            </ul>
            
            {cartItems.length > 0 && (
                <div className="cart-total">
                    <span>Total: ₹ {totalPrice.toFixed(2)}</span>
                </div>
            )}
            <button><Link to="/checkout" style={{color:"white"}}>Proceed to Checkout</Link></button>
        </div>
    );
};

export default CartPage;
