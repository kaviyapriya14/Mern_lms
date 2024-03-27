import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './SectionForm.css';

function SectionForm() {
    const { courseId } = useParams();
    console.log('Course ID:', courseId);

    const navigate = useNavigate();

    // State for dynamic sections, lectures, and quiz
    const [sections, setSections] = useState([{ title: '', file: null, lectures: [], youtubeUrl: '', vimeoUrl: '' }]);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{ title: '', answers: [{ title: '', description: '', isCorrect: false }] }]);
    const [lectureIds, setLectureIds] = useState([]); // Array to store all lecture IDs
    const [sectionIds, setSectionIds] = useState([]); // Store created sectionIds

    // Handler to submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdLectureIds = []; // Array to store lecture IDs for each section
            const createdSectionIds = [];

            for (const section of sections) {
                const formData = new FormData();
                formData.append('course_id', courseId);
                formData.append('section_title', section.title);
                formData.append('section_file', section.file);

                if (section.youtubeUrl) {
                    formData.append('youtube_url', section.youtubeUrl);
                }

                if (section.vimeoUrl) {
                    formData.append('vimeo_url', section.vimeoUrl);
                }

                const sectionResponse = await axios.post('http://localhost:5000/api/section', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const sectionId = sectionResponse.data._id;
                createdSectionIds.push(sectionId); // Store sectionId

                // Create Lectures
                const sectionLectureIds = [];
                for (const lecture of section.lectures) {
                    const lectureFormData = new FormData();
                    lectureFormData.append('section_id', sectionId);
                    lectureFormData.append('lecture_title', lecture.title);
                    lectureFormData.append('lecture_description', lecture.description);
                    lectureFormData.append('video', lecture.videoFile);

                    const lectureResponse = await axios.post('http://localhost:5000/api/lectures', lectureFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    const lectureIdFromResponse = lectureResponse.data.lecture._id;
                    sectionLectureIds.push(lectureIdFromResponse); // Store lectureId
                    createdLectureIds.push(lectureIdFromResponse); // Store lectureId in the array for all sections
                }
                setLectureIds(createdLectureIds); // Store lecture IDs for all sections
            }

            // Create Quiz after creating all sections and lectures
            const quizFormData = {
                section_ids: createdSectionIds, // Pass sectionIds
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
            await axios.post('http://localhost:5000/api/quiz', quizFormData);

            toast.success('Sections, Lectures, and Quiz created successfully!');
            setSectionIds(createdSectionIds); // Store sectionIds

            // Redirect to the preview page
            handlePreview(createdLectureIds, createdSectionIds);

        } catch (error) {
            console.error('Error creating sections, lectures, and quiz:', error);
            toast.error('Failed to create sections, lectures, and quiz');
        }
    };

    // Handlers to add dynamic sections, lectures, and quiz questions
    const handleAddSection = () => {
        setSections([...sections, { title: '', file: null, lectures: [], youtubeUrl: '', vimeoUrl: '' }]);
    };

    const handleAddLecture = (sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].lectures.push({ title: '', description: '', videoFile: null });
        setSections(newSections);
    };

    const handleFileChanges = (e, sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].file = e.target.files[0];
        setSections(newSections);
    };

    const handleFileChange = (e, sectionIndex, lectureIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].lectures[lectureIndex].videoFile = e.target.files[0];
        setSections(newSections);
    };

    const handleYoutubeUrlChange = (e, sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].youtubeUrl = e.target.value;
        setSections(newSections);
    };

    const handleVimeoUrlChange = (e, sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].vimeoUrl = e.target.value;
        setSections(newSections);
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

    const handlePreview = (lectureIds, sectionIds) => {
        navigate(`/preview/${courseId}/${lectureIds.join(',')}/${sectionIds.join(',')}`);
    };

    return (
        <div>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h2>Section {sectionIndex + 1}</h2>
                    <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                            const newSections = [...sections];
                            newSections[sectionIndex].title = e.target.value;
                            setSections(newSections);
                        }}
                        placeholder='Enter the Section Title'
                        required
                    />
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChanges(e, sectionIndex)}
                        required
                    />
                    <br />
                    <label htmlFor={`youtubeUrl_${sectionIndex}`}>YouTube Video URL:</label>
                    <input
                        type="text"
                        id={`youtubeUrl_${sectionIndex}`}
                        value={section.youtubeUrl}
                        onChange={(e) => handleYoutubeUrlChange(e, sectionIndex)}
                        placeholder="Enter YouTube video URL"
                    />
                    {section.youtubeUrl && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${section.youtubeUrl}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    )}
                    <br />
                    <label htmlFor={`vimeoUrl_${sectionIndex}`}>Vimeo Video URL:</label>
                    <input
                        type="text"
                        id={`vimeoUrl_${sectionIndex}`}
                        value={section.vimeoUrl}
                        onChange={(e) => handleVimeoUrlChange(e, sectionIndex)}
                        placeholder="Enter Vimeo video URL"
                    />
                    {section.vimeoUrl && (
                        <iframe
                            src={`https://player.vimeo.com/video/${section.vimeoUrl}`}
                            width="560"
                            height="315"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    )}
                    <hr />
                    <button className="addLecture" type="button" onClick={() => handleAddLecture(sectionIndex)}>Add Lecture</button>
                    <br />
                    {section.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex}>
                            <h3>Lecture {lectureIndex + 1}</h3>
                            <input
                                type="text"
                                value={lecture.title}
                                onChange={(e) => {
                                    const newSections = [...sections];
                                    newSections[sectionIndex].lectures[lectureIndex].title = e.target.value;
                                    setSections(newSections);
                                }}
                                placeholder='Enter the Lecture Title'
                                required
                            />
                            <br />
                            <input
                                type="text"
                                value={lecture.description}
                                onChange={(e) => {
                                    const newSections = [...sections];
                                    newSections[sectionIndex].lectures[lectureIndex].description = e.target.value;
                                    setSections(newSections);
                                }}
                                placeholder='Enter the Lecture Description'
                                required
                            />
                            <br />
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileChange(e, sectionIndex, lectureIndex)}
                                required
                            />
                            <br />
                        </div>
                    ))}
                    <hr />
                </div>
            ))}
            <button className="addSection" type="button" onClick={handleAddSection}>Add Section</button>
            <hr />
            <div>
                <h2>Quiz</h2>
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
                                <input
                                    type="radio"
                                    name={`correct_answer_${questionIndex}`}
                                    onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                                    checked={answer.isCorrect}
                                />
                                <input
                                    type="text"
                                    value={answer.title}
                                    onChange={(e) => setQuestions(questions.map((q, idx) => idx === questionIndex ? { ...q, answers: q.answers.map((a, ai) => ai === answerIndex ? { ...a, title: e.target.value } : a) } : q))}
                                    required
                                />
                                <input
                                    type="text"
                                    value={answer.description}
                                    onChange={(e) => setQuestions(questions.map((q, idx) => idx === questionIndex ? { ...q, answers: q.answers.map((a, ai) => ai === answerIndex ? { ...a, description: e.target.value } : a) } : q))}
                                    required
                                />
                                <br />
                            </div>
                        ))}
                        <button className="addAnswer" type="button" onClick={() => handleAddAnswer(questionIndex)}>Add Answer</button>
                    </div>
                ))}
                <button className="addQuestion" type="button" onClick={handleAddQuestion}>Add Question</button>
            </div>
            <button className='submit' type='submit' onClick={handleSubmit}>Submit</button>
            {lectureIds.length > 0 && <button className='preview' onClick={() => handlePreview(lectureIds, sectionIds)}>Preview</button>}
        </div>
    );
}

export default SectionForm;

