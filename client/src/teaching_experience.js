import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './teaching_experience.css';
import { useNavigate, Link } from 'react-router-dom';

function QuestionsWithOptions() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        fetchQuestionsWithOptions();
    }, []);

    const fetchQuestionsWithOptions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions');
            // Get only the first four questions
            const firstFourQuestions = response.data.slice(0, 4);
            const initialOptions = firstFourQuestions.reduce((acc, question) => {
                acc[question._id] = ''; // Initialize selected option for each question
                return acc;
            }, {});
            setSelectedOptions(initialOptions);
            setQuestions(firstFourQuestions);
        } catch (error) {
            console.error('Error fetching questions with options:', error);
        }
    };

    const handleOptionChange = (questionId, optionId) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionId
        }));
    };

    const handleContinue = () => {
        if (currentQuestionIndex < questions.length - 1) {
            if (!selectedOptions[questions[currentQuestionIndex]._id]) {
                toast.error('select an option');
                return; // Exit early if no option is selected
            }
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            // Submit the selected options if it's the last question
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/api/results/submit', selectedOptions);
            navigate('/course');

        } catch (error) {
            console.error('Error submitting options:', error);
            toast.error('select an option.');
        }
    };

    // Check if questions are loaded and currentQuestionIndex is valid
    if (questions.length === 0 || currentQuestionIndex >= questions.length) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className='teaching'>
            <div id='header' style={{ borderStyle: "solid", borderWidth: "1px", backgroundColor: 'rgb(189, 187, 187)' }}>
                <h1 style={{ display: 'inline-block' }}>Udemy</h1>
                <h2 style={{ display: 'inline-block' }}>step {currentQuestionIndex + 1} of 4</h2>
                <div className="home-button" style={{ width: '5%', display: 'inline-block', marginLeft: '65%', border: 'none' }}>
                    <button className='home'><Link to="/Home" style={{ color: 'red', fontSize: '150%' }}>EXIT</Link></button>
                </div>
            </div>
            <h2 style={{ fontSize: '27px' }}>{currentQuestion.title}</h2>
            <ul>
                {currentQuestion.options && currentQuestion.options.map(option => (
                    <li style={{ borderStyle: 'solid', borderWidth: '1px', width: '40%', padding: '10px', marginTop: '8px', listStyleType: 'none' }} key={option._id} >
                        <input
                            type="radio"
                            id={option._id}
                            name={`question_${currentQuestion._id}`}
                            value={option._id}
                            checked={selectedOptions[currentQuestion._id] === option._id}
                            onChange={() => handleOptionChange(currentQuestion._id, option._id)}
                        />
                        <label htmlFor={option._id}>{option.title}</label>
                    </li>
                ))}
            </ul>
            <div className='footer' style={{ backgroundColor: 'rgb(189, 187, 187)' }}>
                <button className='prev' style={{ backgroundColor: 'grey' }} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                <button className='continue' style={{ backgroundColor: 'grey' }} onClick={handleContinue}>{currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Submit'}</button>
            </div>
        </div>
    );
}

export default QuestionsWithOptions;
