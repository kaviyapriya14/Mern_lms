import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ courseId, selectedNavItem, handleNavigation }) {
    return (
        <div className="sidebar" style={{ width: '240px', height: '100vh', backgroundColor: 'white', padding: '20px', boxShadow: '15px 0 10px rgba(0, 0, 0, 0.1)' }}>

            <ul style={{ listStyleType: 'none' }}>
                <h3>Plan your course</h3>
                <li>
                    <input type="radio" id="intended-learner" name="navigator" checked={selectedNavItem === 'intended-learner'} onChange={() => handleNavigation('intended-learner')} />
                    <label htmlFor="intended-learner"><Link to={`/intended/${courseId}`}>Intended Learner</Link></label>
                </li>
                <h3>Create your content</h3>
                <li>
                    <input type="radio" id="curriculum" name="navigator" checked={selectedNavItem === 'curriculum'} onChange={() => handleNavigation('curriculum')} />
                    <label htmlFor="curriculum"><Link to={`/curriculum/${courseId}`}>Curriculum</Link></label>
                </li>
                <h3>Publish your course</h3>
                <li>
                    <input type="radio" id="courselanding" name="navigator" checked={selectedNavItem === 'courselanding'} onChange={() => handleNavigation('courselanding')} />
                    <label htmlFor="courselanding"><Link to={`/courselanding/${courseId}`}>Course Landing Page</Link></label>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
