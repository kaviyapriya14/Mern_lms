import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LecturePreviewComponent = ({ lectureIds }) => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLecturesDetails = async () => {
            try {
                const lectureIdsArray = lectureIds.split(',');
                const lecturesData = await Promise.all(lectureIdsArray.map(async id => {
                    const response = await axios.get(`http://localhost:5000/api/lectures/${id}`);
                    return response.data.lecture;
                }));
                setLectures(lecturesData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch lecture details');
                setLoading(false);
            }
        };

        fetchLecturesDetails();
    }, [lectureIds]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!lectures || lectures.length === 0) {
        return <div>No lectures found</div>;
    }

    return (
        <div>
            {lectures.map((lecture, index) => (
                <div key={index}>
                    <div style={{ flex: '1 1 100%', marginRight: '50px' }}>
                        <video controls style={{ width: '100%', height: 'auto' }}>
                            <source src={lecture.video_url} type="video/mp4" />
                            <p>Your browser does not support the video tag.</p>
                        </video>
                    </div>
                    <div>
                        <div>
                            <h2 className="lecture-title">Lecture : {lecture.lecture_title}</h2>
                            <p className="lecture-description">Lecture description : {lecture.lecture_description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LecturePreviewComponent;
