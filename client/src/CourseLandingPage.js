import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseLandingPage.css';

function CourseLandingPage() {
    const { courseId, sectionIds, lectureIds } = useParams();
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseSubtitle, setCourseSubtitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseLocale, setCourseLocale] = useState('English (US)');
    const [instructionalLevel, setInstructionalLevel] = useState('All levels');
    const [courseCategory, setCourseCategory] = useState('Music');
    const [courseSubcategory, setCourseSubcategory] = useState('Vocal');
    const [topic, setTopic] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [promotionalVideo, setPromotionalVideo] = useState(null);
    const [savedCourseLandingId, setSavedCourseLandingId] = useState(null);

    useEffect(() => {
        const fetchCourseTitle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
                setCourseTitle(response.data.course.course_title);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch course title');
                setLoading(false);
            }
        };

        fetchCourseTitle();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('courseId', courseId);
            formData.append('sectionIds', sectionIds);
            formData.append('lectureIds', lectureIds);
            formData.append('courseTitle', courseTitle);
            formData.append('courseSubtitle', courseSubtitle);
            formData.append('courseDescription', courseDescription);
            formData.append('courseLocale', courseLocale);
            formData.append('instructionalLevel', instructionalLevel);
            formData.append('courseCategory', courseCategory);
            formData.append('courseSubcategory', courseSubcategory);
            formData.append('topic', topic);
            if (courseImage) {
                formData.append('courseImage', courseImage);
            }
            if (promotionalVideo) {
                formData.append('promotionalVideo', promotionalVideo);
            }

            const response = await axios.post('http://localhost:5000/api/courselanding', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const savedCourseLandingId = response.data.savedCourseLanding._id;
            setSavedCourseLandingId(savedCourseLandingId); 

            console.log('Saved document ID:', savedCourseLandingId);
            console.log(response.data);

            navigate(`/courselandingpreview/${savedCourseLandingId}/${courseId}/${sectionIds}/${lectureIds}`);
        } catch (error) {
            console.error('Error submitting course landing page:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (e.target.name === 'courseImage') {
            setCourseImage(file);
        } else if (e.target.name === 'promotionalVideo') {
            setPromotionalVideo(file);
        }
    };
    return (
        <div className="course-landing-page">
            <h1>Course Landing Page</h1>
            <hr />
            <p>Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course. Learn more about creating your course landing page and course title standards.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Title</label>
                    <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                <div>
                    <label>Course Subtitle</label>
                    <input type="text" value={courseSubtitle} onChange={(e) => setCourseSubtitle(e.target.value)} />
                </div>
                <div>
                    <label>Course Description</label>
                    <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                </div>
                <div>
                    <label>Course Locale</label>
                    <select value={courseLocale} onChange={(e) => setCourseLocale(e.target.value)}>
                        <option value="English (US)">English (US)</option>
                        <option value="தமிழ்">தமிழ்</option>
                        <option value="English (UK)">English (UK)</option>
                        <option value="Malayalam">Malayalam</option>
                    </select>
                </div>
                <div>
                    <label>instructionalLevel</label>
                    <select value={instructionalLevel} onChange={(e) => setInstructionalLevel(e.target.value)}>
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Expert level">Expert level</option>
                        <option value="All levels">All levels</option>
                    </select>
                </div>
                <div>
                    <label>Course Category</label>
                    <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)}>
                        <option value="Finance & Accounting">Finance & Accounting</option>
                        <option value="IT & Software">IT & Software</option>
                        <option value="Office Productivity">Office Productivity</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Life Style">Life Style</option>
                        <option value="Photography & Video">Photography & Video</option>
                        <option value="Health Fitness">Health Fitness</option>
                        <option value="Music">Music</option>
                        <option value="Teaching and Academics">Teaching and Academics</option>
                        <option value="I don't know yet">I don't know yet</option>
                    </select>
                </div>
                <div>
                    <label>Course Subcategory</label>
                    <select value={courseSubcategory} onChange={(e) => setCourseSubcategory(e.target.value)}>
                        <option value="Instruments">Instruments</option>
                        <option value="Music Production">Music Production</option>
                        <option value="Music Fundamentals">Music Fundamentals</option>
                        <option value="Vocal">Vocal</option>
                        <option value="Music Techniques">Music Techniques</option>
                        <option value="Music Software">Music Software</option>
                        <option value="Other Music">Other Music</option>
                    </select>
                </div>
                <div>
                    <label>What is primarily taught in your course?</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                </div>
                <div>
                    <label>Upload Course Image</label>
                    <input type="file" name="courseImage" onChange={handleFileUpload} />
                </div>
                <div>
                    <label>Upload Promotional Video</label>
                    <input type="file" name="promotionalVideo" onChange={handleFileUpload} />
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default CourseLandingPage;


