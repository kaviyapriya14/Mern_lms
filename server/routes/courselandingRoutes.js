// courselandingRoutes.js
const express = require('express');
const router = express.Router();
const courselandingController = require('../controllers/courselandingController');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define the GET route first
router.get('/:id', (req, res) => {
    console.log(req.params.id); // Log the savedCourseLandingId received by the backend
    courselandingController.getCourseLandingById(req, res);
});

// Define the POST route
router.post('/', upload.fields([
    { name: 'courseImage', maxCount: 1 },
    { name: 'promotionalVideo', maxCount: 1 }
]), courselandingController.uploadCourseFiles);

module.exports = router;
