import React, { useState } from 'react';
import axios from 'axios';
import { validateForm } from './formValidation';
import './App.css';
import { useNavigate } from 'react-router-dom';



function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Reset error message when user starts typing again
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = () => {
        const formErrors = validateForm(formData);

        if (Object.keys(formErrors).length === 0) {
            console.log(formData);
            axios.post('http://localhost:5000/user/register', formData)
                .then(response => {
                    console.log('User registered successfully:', response.data);
                    navigate('/home');
                })
                .catch(error => {
                    console.error('Error registering user:', error.message);
                });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <form>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <span className="error">{errors.first_name}</span><br />

                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    <span className="error">{errors.last_name}</span><br />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <span className="error">{errors.email}</span><br />

                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    <span className="error">{errors.phone_number}</span><br />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="error">{errors.password}</span><br />

                    <button type="button" onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
