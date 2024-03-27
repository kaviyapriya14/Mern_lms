import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import './AllCourses.css';

const AllCourses = ({ addToCart }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/allcourses');
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="all-courses-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="course-list">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} addToCart={addToCart} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCourses;
