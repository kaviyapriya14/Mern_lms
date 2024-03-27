import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const QuizForm = ({ lecture_id }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{ title: '', answers: [{ title: '', description: '', isCorrect: false }] }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                lecture_id: lecture_id,
                quiz_title: quizTitle,
                quiz_description: quizDescription,
                questions: questions.map(question => ({
                    question_title: question.title,
                    answers: question.answers.map(answer => ({
                        answer_title: answer.title,
                        description: answer.description,
                        isCorrect: answer.isCorrect
                    })),
                    correct_answer_index: question.answers.findIndex(answer => answer.isCorrect),
                })),
            };
            await axios.post('http://localhost:5000/api/quiz', formData);
            toast.success('Quiz submitted successfully!');
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('Error submitting quiz. Please try again.');
        }
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { title: '', answers: [{ title: '', description: '', isCorrect: false }] }]);
    };

    const handleAddAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push({ title: '', description: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.forEach((answer, idx) => {
            answer.isCorrect = idx === answerIndex;
        });
        setQuestions(newQuestions);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="quiz_title">Quiz Title:</label>
            <input type="text" name="quiz_title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} required />
            <br />
            <label htmlFor="quiz_description">Quiz Description:</label>
            <input type="text" name="quiz_description" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} required />
            <br />
            {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <label htmlFor={`question_${questionIndex}`}>Question {questionIndex + 1}:</label>
                    <input type="text" id={`question_${questionIndex}`} value={question.title} onChange={(e) => setQuestions(questions.map((q, idx) => idx === questionIndex ? { ...q, title: e.target.value } : q))} required />
                    <br />
                    {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            <input type="radio" name={`correct_answer_${questionIndex}`} onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)} checked={answer.isCorrect} />
                            <input type="text" value={answer.title} onChange={(e) => setQuestions(questions.map((q, idx) => idx === questionIndex ? { ...q, answers: q.answers.map((a, ai) => ai === answerIndex ? { ...a, title: e.target.value } : a) } : q))} required />
                            <input type="text" value={answer.description} onChange={(e) => setQuestions(questions.map((q, idx) => idx === questionIndex ? { ...q, answers: q.answers.map((a, ai) => ai === answerIndex ? { ...a, description: e.target.value } : a) } : q))} required />
                            <br />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddAnswer(questionIndex)}>Add Answer</button>
                </div>
            ))}
            <button type="button" onClick={handleAddQuestion}>Add Question</button>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default QuizForm;
