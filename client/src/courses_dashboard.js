import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCreation() {
    const navigate = useNavigate();

    const handleCreateCourse = () => {
        navigate('/teach');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Jump into Course Creation</h2>
            <div style={styles.form}>
                <button type="submit" style={styles.button} onClick={handleCreateCourse}>Create Your Course</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        color: '#333',
        textAlign: 'left',
        display: 'inline-block',
        marginRight: '20px',
    },
    form: {
        marginTop: 0,
        textAlign: 'right',
        display: 'inline-block',
        width: '30%',
        marginLeft: '350px',
    },
    button: {
        backgroundColor: 'purple',
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },

};

export default CourseCreation;
