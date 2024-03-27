import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryDropdown({ setCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.category_name}</option>
                ))}
            </select>
        </div>
    );
}

export default CategoryDropdown;
