import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import SectionForm from './SectionForm';

function IntendedLearner() {
    const [seventhQuestion, setSeventhQuestion] = useState({ _id: '', title: '', response: '' });
    const [eighthQuestion, setEighthQuestion] = useState({ _id: '', title: '', response: '' });
    const [ninthQuestion, setNinthQuestion] = useState({ _id: '', title: '', response: '' });
    const [selectedNavItem, setSelectedNavItem] = useState('intended-learner');
    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/questions');
            const questions = response.data;

            setSeventhQuestion(questions[6]);
            setEighthQuestion(questions[7]);
            setNinthQuestion(questions[8]);
        } catch (error) {
            console.error('Error fetching questions:', error);
            toast.error('Failed to fetch questions');
        }
    };

    const handleNavigation = (route) => {
        setSelectedNavItem(route);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/intended-learner', {
                responses: [
                    { questionId: seventhQuestion._id, userInput: seventhQuestion.response },
                    { questionId: eighthQuestion._id, userInput: eighthQuestion.response },
                    { questionId: ninthQuestion._id, userInput: ninthQuestion.response }
                ]
            });

            toast.success('User responses submitted successfully!');
            setSelectedNavItem('curriculum');
        } catch (error) {
            console.error('Error submitting user responses:', error);
            toast.error('Failed to submit user responses');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar courseId={courseId} selectedNavItem={selectedNavItem} handleNavigation={handleNavigation} />
            <div style={{ marginLeft: '20px', flex: '1', padding: '20px', marginTop: '80px' }}>
                {selectedNavItem === 'intended-learner' && (
                    <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '0px' }}>
                        <div>
                            <h2>Intended Learner</h2><hr></hr>
                            <div style={{ marginBottom: '20px' }}>
                                <h3>{seventhQuestion.title}</h3>
                                <textarea
                                    value={seventhQuestion.response}
                                    onChange={(e) => setSeventhQuestion(prev => ({ ...prev, response: e.target.value }))}
                                    style={{ width: '50%', minHeight: '30px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <h3>{eighthQuestion.title}</h3>
                                <textarea
                                    value={eighthQuestion.response}
                                    onChange={(e) => setEighthQuestion(prev => ({ ...prev, response: e.target.value }))}
                                    style={{ width: '50%', minHeight: '30px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <h3>{ninthQuestion.title}</h3>
                                <textarea
                                    value={ninthQuestion.response}
                                    onChange={(e) => setNinthQuestion(prev => ({ ...prev, response: e.target.value }))}
                                    style={{ width: '50%', minHeight: '30px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" style={{ color: '#fff', padding: '10px', border: 'solid', borderRadius: '0px', cursor: 'pointer', width: '100px', backgroundColor: 'green' }}>Continue</button>

                        </div>
                    </form>
                )}
                {selectedNavItem === 'curriculum' && (
                    <SectionForm courseId={courseId} />
                )}
            </div>
        </div>
    );
}

export default IntendedLearner;
