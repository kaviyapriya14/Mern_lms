// courselandingController.js
const CourseLanding = require('../models/CourseLanding');

// Controller functions
const courselandingController = {
    uploadCourseFiles: async (req, res) => {
        // Check if files are present
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded' });
        }

        // Save file paths to database or perform other operations
        const { courseImage, promotionalVideo } = req.files;

        // Ensure filenames are defined
        if (!courseImage[0].filename || !promotionalVideo[0].filename) {
            return res.status(400).json({ message: 'File names are undefined' });
        }

        const courseImageFilePath = `http://localhost:5000/uploads/${courseImage[0].filename}`;
        const promotionalVideoFilePath = `http://localhost:5000/uploads/${promotionalVideo[0].filename}`;

        // Example: save file paths to database
        const courseLanding = new CourseLanding({
            courseId: req.body.courseId,
            sectionIds: req.body.sectionIds,
            lectureIds: req.body.lectureIds,
            courseTitle: req.body.courseTitle,
            courseSubtitle: req.body.courseSubtitle,
            courseDescription: req.body.courseDescription,
            courseLocale: req.body.courseLocale,
            instructionalLevel: req.body.instructionalLevel,
            courseCategory: req.body.courseCategory,
            courseSubcategory: req.body.courseSubcategory,
            topic: req.body.topic,
            courseImage: courseImageFilePath,
            promotionalVideo: promotionalVideoFilePath
        });

        try {
            const savedCourseLanding = await courseLanding.save();
            res.status(200).json({ message: 'Files uploaded successfully', savedCourseLanding });
        } catch (error) {
            console.error('Error saving course landing:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCourseLandingById: async (req, res) => {
        try {
            const savedCourseLandingId = req.params.id;
            const courseLanding = await CourseLanding.findById(savedCourseLandingId);
            if (!courseLanding) {
                return res.status(404).json({ message: 'Course landing not found' });
            }
            res.status(200).json(courseLanding);
        } catch (error) {
            console.error('Error fetching course landing:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = courselandingController;
