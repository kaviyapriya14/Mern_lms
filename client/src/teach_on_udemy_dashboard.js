import React from 'react';
import teachOnUdemyImage from './teach_on_udemy_dashboard.jpg';
import './TeachOnUdemyDashboard.css';
import { Link } from 'react-router-dom';


const TeachOnUdemyDashboard = () => {
    return (
        <div>
            <header className='header'>
                <div className="logo">
                    <h1>Udemy</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="🔍 Search courses..." />
                </div>
                <div className="home-button">
                    <button className='home'><Link to="/Home">Home</Link></button>
                </div>
            </header>

            <div className="hero-section">
                <img className="hero-image" src={teachOnUdemyImage} alt="Teach on Udemy" />
                <div className="overlay-text">
                    <h2 style={{ fontFamily: 'Times New Roman, Times, serif' }}>Come teach <br />with Us</h2>
                    <p>Become a instructor and change<br />lives-including your own</p>
                    <Link to="/teaching_experience" className='link' >Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default TeachOnUdemyDashboard;
