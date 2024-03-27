import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './CourseLandingPreview.css';

const CourseLandingPreview = () => {
    const { courseId, lectureIds, sectionIds, savedCourseLandingId } = useParams();
    const [courseLanding, setCourseLanding] = useState(null);
    const [loading, setLoading] = useState(true);

    // State for course details
    const [course, setCourse] = useState(null);
    const [courseLoading, setCourseLoading] = useState(true);
    const [courseError, setCourseError] = useState(null);

    // State for lectures
    const [lectures, setLectures] = useState([]);
    const [lectureLoading, setLectureLoading] = useState(true);
    const [lectureError, setLectureError] = useState(null);

    // State for sections
    const [sections, setSections] = useState([]);
    const [sectionLoading, setSectionLoading] = useState(true);
    const [sectionError, setSectionError] = useState(null);

    // State for selected lecture
    const [selectedLecture, setSelectedLecture] = useState(null);

    useEffect(() => {
        // Fetch course details
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
                setCourse(response.data.course);
                setCourseLoading(false);
            } catch (error) {
                setCourseError('Failed to fetch course details');
                setCourseLoading(false);
            }
        };

        // Fetch lectures
        const fetchLecturesDetails = async () => {
            try {
                const lectureIdsArray = lectureIds.split(',');
                const lecturesData = await Promise.all(lectureIdsArray.map(async id => {
                    const response = await axios.get(`http://localhost:5000/api/lectures/${id}`);
                    return response.data.lecture;
                }));
                setLectures(lecturesData);
                setLectureLoading(false);
            } catch (error) {
                setLectureError('Failed to fetch lecture details');
                setLectureLoading(false);
            }
        };

        // Fetch sections
        const fetchSectionDetails = async () => {
            try {
                const sectionPromises = sectionIds.split(',').map(async (sectionId) => {
                    const response = await axios.get(`http://localhost:5000/api/section/${sectionId}`);
                    return response.data.section;
                });

                const fetchedSections = await Promise.all(sectionPromises);
                setSections(fetchedSections);
                setSectionLoading(false);

                const response = await axios.get(`http://localhost:5000/api/courselanding/${savedCourseLandingId}`);
                setCourseLanding(response.data);
                setLoading(false);
            } catch (error) {
                setSectionError('Failed to fetch section details');
                setSectionLoading(false);
            }
        };

        // Call all fetch functions
        fetchCourseDetails();
        fetchLecturesDetails();
        fetchSectionDetails();
    }, [courseId, lectureIds, sectionIds, savedCourseLandingId]);

    // Handle lecture click
    const handleLectureClick = (lecture) => {
        setSelectedLecture(prevLecture => (prevLecture === lecture ? null : lecture));
    };

    // Render loading states
    if (courseLoading || lectureLoading || sectionLoading) {
        return <div className="loading">Loading...</div>;
    }

    // Render error states
    if (courseError || lectureError || sectionError) {
        return <div className="error">Error: {courseError || lectureError || sectionError}</div>;
    }

    return (
        <div className="course-landing-container">
            <div className="header">
                <h2 className='logo' style={{ fontSize: "40px" }}>Udemy</h2>
                <input type="text" placeholder="Search..." className="search-bar" style={{ width: "50%", borderRadius: "10px" }} />
            </div>
            {courseLanding && (
                <div className="content-container">
                    <div className="course-category">
                        <span>
                            {courseLanding.courseCategory}
                            <span className="greater-than"> &gt; </span>
                            {courseLanding.courseSubcategory}
                        </span>
                    </div>
                    <div className="course-info">
                        <h1 className="course-title">{course.course_title}</h1>
                        <p className="course-subtitle">{courseLanding.courseSubtitle}</p>
                    </div>
                    <div className="video-container">
                        <video controls poster={courseLanding.courseImage} className="promo-video">
                            <source src={courseLanding.promotionalVideo} type="video/mp4" />
                            <p>Your browser does not support the video tag.</p>
                        </video>

                    </div>
                </div>
            )}
            <div className="sections-container">
                {sections.map((section) => (
                    <div key={section._id} className="section">
                        <h2>Section : {section.section_title}</h2>
                        <ul className="lecture-list">
                            {lectures
                                .filter((lecture) => lecture.section_id === section._id)
                                .map((lecture) => (
                                    <li key={lecture._id} onClick={() => handleLectureClick(lecture)}>
                                        <span className="lecture-title">{lecture.lecture_title}</span>
                                        <span className="lecture-description">{lecture.lecture_description}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}


                <div className="video-container">
                    {selectedLecture && (
                        <video controls>
                            <source src={selectedLecture.video_url} type="video/mp4" />
                            <p>Your browser does not support the video tag.</p>
                        </video>
                    )}
                </div>
            </div>




            {courseLanding && (
                <div className="course-landing-details">
                </div>
            )}

            {courseLanding && (
                <div className="promotional-video">
                </div>
            )}


            <Link to={`/pricing/${courseId}/${lectureIds}/${sectionIds}/${savedCourseLandingId}`}>Set Price for Your Course</Link>

        </div>
    );
};

export default CourseLandingPreview;
