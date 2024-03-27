const Section = require('../models/section');

exports.createSection = async (req, res) => {
    try {
        const { course_id, section_title, youtube_url, vimeo_url } = req.body;
        let sectionData = { course_id, section_title };

        if (req.file) {
            sectionData.section_file_path = req.file.path;
        }

        if (youtube_url) {
            sectionData.youtube_url = youtube_url;
        }
        if (vimeo_url) {
            sectionData.vimeo_url = vimeo_url;
        }

        const section = new Section(sectionData);
        await section.save();
        res.status(201).json(section);
    } catch (error) {
        console.error('Error creating section:', error);
        res.status(500).json({ error: 'Failed to create section' });
    }
};
