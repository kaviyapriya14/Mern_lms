import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import AllCourses from './AllCourses';
import './Home.css';
import udemyimage from './udemy.png'

const Home = ({ addToCart, cartItems, setCartItems }) => {
    return (
        <div className="home">
            <header style={{ backgroundColor: "white" }}>
            <img src={udemyimage} alt="Udemy" className="udemy-image" />
             <Link className='category' to="/categories">Categories</Link>
                <div className="search-bar">
                    <input type="text" placeholder="&#128269; Search courses..." />
                </div>
                <CartIcon cartCount={cartItems.length} />

                <div className="teach_on_udemy">
                    <Link to="/teach-on-udemy">Teach on Udemy</Link>
                </div>
            </header>
            <div className="course-container">
                <AllCourses addToCart={addToCart} />
            </div>
            <footer>
                &copy; 2024 Learning Management System
            </footer>
        </div>
    );
}

export default Home;
