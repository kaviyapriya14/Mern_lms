import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './viewPage.css';
import udemyimage from './udemy.png';

const ViewPage = () => {
    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [audioMode, setAudioMode] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/allcourses/${id}`);
                const courseData = response.data;
                setCourse(courseData);

                const sectionIds = courseData.sectionIds.split(',');
                const sectionPromises = sectionIds.map(async sectionId => {
                    const sectionResponse = await axios.get(`http://localhost:5000/api/section/${sectionId}`);
                    return sectionResponse.data.section;
                });
                const fetchedSections = await Promise.all(sectionPromises);
                setSections(fetchedSections);

                const lectureIds = courseData.lectureIds.split(',');
                const lecturePromises = lectureIds.map(async lectureId => {
                    const lectureResponse = await axios.get(`http://localhost:5000/api/lectures/${lectureId}`);
                    return lectureResponse.data.lecture;
                });
                const fetchedLectures = await Promise.all(lecturePromises);
                setLectures(fetchedLectures);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);
    // Function to extract YouTube video ID from URL
    const getYoutubeVideoId = (url) => {
        const videoIdRegex = /[?&]v=([^#\&\?]+)/;
        const match = url.match(videoIdRegex);
        return match && match[1] ? match[1] : '';
    };

    // Function to extract Vimeo video ID from URL
    const getVimeoVideoId = (url) => {
        const videoIdRegex = /vimeo.com\/(\d+)/;
        const match = url.match(videoIdRegex);
        return match && match[1] ? match[1] : '';
    };

    const handleToggleAudioMode = () => {
        setAudioMode(prevMode => !prevMode);
    };

    if (!id) {
        return <div className="view-page">No course ID provided.</div>;
    }

    if (!course || !sections || !lectures) {
        return <div className="view-page">Loading...</div>;
    }

    return (
        <div className="view-page">
            <div className="header">
                <img src={udemyimage} alt="Udemy" className="udemy-image" />
                <Link className='category' to="/categories">Categories</Link>
                <div className="search-bar">
                    <input type="text" placeholder="&#128269; Search courses..." />
                </div>
            </div>

            <div className="course-details-and-video">
                <div className="course-details-container">
                    <div className="course-details">
                        <div className="course-meta">
                            <p>{course.courseCategory}</p>
                            <span className='greater-than'>&gt;</span>
                            <p>{course.courseSubcategory}</p>
                        </div>
                        <h2 className="course-title">{course.courseTitle}</h2>
                        <div className="course-description">
                            <p className="course-description">{course.courseDescription}</p>
                        </div>
                        <div className="course-meta">
                            <p><strong>Language:</strong> {course.courseLocale}</p>
                        </div>
                    </div>
                    <video controls poster={course.courseImage} className="promo-video">
                        <source src={course.promotionalVideo} type="video/mp4" />
                        <p>Your browser does not support the video tag.</p>
                    </video>

                </div>


            </div>

            <div className="sections-lectures-container">
                <div className="sections">
                    <h2 className="section-title">Sections</h2>
                    <ul className="section-list">
                        {sections.map(section => (
                            <li key={section._id} className="section-item">
                                <span>{section.section_title}</span>
                                {section.youtube_url && (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(section.youtube_url)}`}
                                        title="YouTube video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                                {/* Render Vimeo video */}
                                {section.vimeo_url && (
                                    <iframe
                                        src={`https://player.vimeo.com/video/${getVimeoVideoId(section.vimeo_url)}`}
                                        width="560"
                                        height="315"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                                {section.section_file_path && (  
                                    section.section_file_path.endsWith('.pdf') ? (
                                        <embed src={`http://localhost:5000/${section.section_file_path}`} type="application/pdf" width="80%" height="400px" />
                                    ) : (
                                        <a href={`http://localhost:5000/${section.section_file_path}`} target="_self" rel="noopener noreferrer">Download File</a>
                                    )
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lectures">
                    <h2 className="lecture-title">Lectures</h2>
                    <ul className="lecture-list">
                        {lectures.map(lecture => (
                            <li key={lecture._id} className="lecture-item">
                                <p className="lecture-name">{lecture.lecture_title}</p>
                                <p className="lecture-description">{lecture.lecture_description}</p>
                                {audioMode ? (
                                    <audio controls className="audio-player">
                                        <source src={lecture.video_url} type="audio/mp3" />
                                        Your browser does not support the audio tag.
                                    </audio>
                                ) : (
                                    <video controls className="video-player">
                                        <source src={lecture.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="audio-mode-toggle">
                <label className="audio-mode-label">
                    <input type="checkbox" checked={audioMode} onChange={handleToggleAudioMode} />
                    <span className="toggle-text">Audio Mode</span>
                </label>
            </div>
        </div>
    );
};

export default ViewPage;
