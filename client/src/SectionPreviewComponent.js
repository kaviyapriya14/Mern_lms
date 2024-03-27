import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SectionPreviewComponent.css"

const SectionPreviewComponent = ({ sectionIds }) => { // Receiving sectionIds as prop
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSectionDetails = async () => {
            try {
                const sectionPromises = sectionIds.split(',').map(async (sectionId) => {
                    const response = await axios.get(`http://localhost:5000/api/section/${sectionId}`);
                    return response.data.section;
                });

                const fetchedSections = await Promise.all(sectionPromises);
                setSections(fetchedSections);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch section details');
                setLoading(false);
            }
        };

        fetchSectionDetails();
    }, [sectionIds]);

    if (loading) {
        return <div>Loading sections...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='sectioncontainer'>
            {sections.map((section) => (
                <div className='sectiontitle' key={section._id}>
                    <h3>Section : {section.section_title}</h3>
                    <h3>Section file:{section.section_file_path}</h3>
                </div>
            ))}
        </div>
    );
};

export default SectionPreviewComponent;
