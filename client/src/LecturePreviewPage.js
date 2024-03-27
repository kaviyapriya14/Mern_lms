import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LecturePreviewPage.css';
import { Link } from 'react-router-dom';


const LecturePreviewPage = () => {
    const { lectureIds, sectionIds, courseId } = useParams();

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
            } catch (error) {
                setSectionError('Failed to fetch section details');
                setSectionLoading(false);
            }
        };

        fetchCourseDetails();
        fetchLecturesDetails();
        fetchSectionDetails();
    }, [courseId, lectureIds, sectionIds]);

    const handleLectureClick = (lecture) => {
        setSelectedLecture(prevLecture => (prevLecture === lecture ? null : lecture));
    };

    if (courseLoading || lectureLoading || sectionLoading) {
        return <div>Loading...</div>;
    }

    if (courseError || lectureError || sectionError) {
        return <div>Error: {courseError || lectureError || sectionError}</div>;
    }

    // Render course, lectures, and sections
    return (
        <div className="lecture-preview-page">
            <header className="header">
                <h1>{course.course_title}</h1>
            </header>
            <div className="lecture-body">
                <div className="sections-container">
                    {sections.map((section) => (
                        <div key={section._id} className="section">
                            <h2>Section : {section.section_title}</h2>
                            <a href={`http://localhost:5000/${section.section_file_path}`} target="_blank" rel="noopener noreferrer">Download File</a>
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
                    <button className='sectionform' style={{ width: '70px', backgroundColor: 'grey' }}><Link to={`/section-form/${courseId}`} style={{ color: 'white', fontSize: '150%' }}>BACK</Link></button>

                    <Link to={`/courselanding/${courseId}/${lectureIds}/${sectionIds}`}>Continue</Link>
                </div>
                <div className="video-container">
                    {selectedLecture && (
                        <video controls>
                            <source src={selectedLecture.video_url} type="video/mp4" />
                            <p>Your browser does not support the video tag.</p>
                        </video>
                    )}
                </div>
            </div>

        </div>
    );
};

export default LecturePreviewPage;
