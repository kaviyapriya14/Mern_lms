const express = require('express');
const router = express.Router();
const multer = require('multer');
const Section = require('../models/section');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Set upload destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Keep original file name
    }
});
const upload = multer({ storage: storage });

// Create section with file upload
router.post('/', upload.single('section_file'), async (req, res) => {
    try {
        const { course_id, section_title, youtube_url, vimeo_url } = req.body;
        let sectionData = { course_id, section_title };

        // Check if a file is uploaded
        if (req.file) {
            sectionData.section_file_path = req.file.path;
        }

        // Add YouTube and Vimeo URLs to section data
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
});

// Get section by ID
router.get('/:sectionId', async (req, res) => {
    try {
        const section = await Section.findById(req.params.sectionId);
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json({ section });
    } catch (error) {
        console.error('Error fetching section:', error);
        res.status(500).json({ error: 'Failed to fetch section' });
    }
});

module.exports = router;
