import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryDropdown from './CategoryDropdown';
import { useNavigate } from 'react-router-dom';


function CourseForm() {
    const [category, setCategory] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [fifthQuestion, setFifthQuestion] = useState('');
    const [sixthQuestion, setSixthQuestion] = useState('');
    const [courseId, setCourseId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions');
            const fifthQuestion = response.data[4];
            const sixthQuestion = response.data[5];
            setFifthQuestion(fifthQuestion.title);
            setSixthQuestion(sixthQuestion.title);
        } catch (error) {
            console.error('Error fetching questions:', error);
            toast.error('Failed to fetch questions');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/course', {
                category_id: category,
                course_title: courseTitle
            });
            const courseId = response.data._id;
            setCourseId(courseId);
            console.log('Course Creation Response:', response.data);
            toast.success('Course created successfully!');
            navigate(`/intended/${courseId}`);
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('Failed to create course');
        }
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setCurrentStep(step => step + 1);
    };

    // Render different steps based on currentStep
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h3 style={{ textAlign: 'center', fontSize: '27px' }}>{fifthQuestion}</h3>
                        <p style={{ textAlign: 'center' }}>It's ok if you can't think of a good title now. You can change it later.</p>
                        <input style={{ width: '50%', marginLeft: '25%' }}
                            type="text"
                            id="courseTitle"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            required
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 style={{ textAlign: 'center', fontSize: '27px' }}>{sixthQuestion}</h3>
                        <p style={{ textAlign: 'center' }}>If you're not sure about the right category, you can change it later.</p>
                        <CategoryDropdown setCategory={setCategory} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <header className='header' style={{ backgroundColor: '#f2f2f2', padding: '10px', marginBottom: '20px' }}>
                <h1>Udemy</h1>
            </header>
            <form>
                {renderStep()}
            </form>
            <footer className='footer' style={{ backgroundColor: '#f2f2f2', padding: '10px', marginTop: '20px' }}>
                {currentStep === 1 && <button style={{ width: '80px', marginRight: '90%', borderRadius: '0px', backgroundColor: 'grey' }} onClick={handleNextStep}>Continue</button>}
                {currentStep === 2 && <button style={{ width: '80px', marginRight: '90%', borderRadius: '0px', backgroundColor: 'grey' }} onClick={handleSubmit}>Continue</button>}
            </footer>
        </div>
    );
}

export default CourseForm;
