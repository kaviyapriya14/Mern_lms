import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(course); // Call addToCart function with the course as parameter 
    };

    const handleClick = () => {
        // Navigate to the view page with the course details
        console.log(`Navigating to view page for course: ${course.courseTitle}`);
// Handle navigation logic here
    };

    return (
        <Link to={`/courses/${course._id}`} className="course-card-link"> {/* Navigate to view page with course ID */}
            <div className="course-card" onClick={handleClick}>
                <img src={course.courseImage} alt={course.courseTitle} className="course-image" />
                <div className="course-details">
                    <h2 className="course-title">{course.courseTitle}</h2>
                    <p className="course-description">{course.courseDescription}</p>
                    <div className="course-price">
                        {course.priceTier === 'Free' ? 'Free' : `${course.currency} ${course.priceTier}`}
                    </div>
                    <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>Add to Cart</button>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
