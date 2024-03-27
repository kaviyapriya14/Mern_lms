// ParentComponent.js
import React from 'react';
import CourseCard from './CourseCard';

const ParentComponent = ({ courses }) => {
    const addToCart = (course) => {
        console.log('Added to cart:', course);
    };

    return (
        <div className="course-container">
            {courses.map(course => (
                <CourseCard key={course._id} course={course} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ParentComponent;
