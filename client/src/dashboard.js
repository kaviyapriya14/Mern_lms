import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="header" style={{ marginBottom: '450px' }}>
                <div className="logo">
                    <h1>Udemy</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="&#128269; Search courses..." />
                </div>
                <div className="button-container">
                    <Link to="/register" className="dashboard-button" id='register'>
                        Register
                    </Link>
                    <Link to="/login" className="dashboard-button" id='login'>
                        Login
                    </Link>
                </div>
            </header>
            <footer className="footer">
                &copy; 2024 Learning Management System
            </footer>
        </div>
    );
};

export default Dashboard;
