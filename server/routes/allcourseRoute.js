// routes/allcourseRoute.js
const express = require('express');
const router = express.Router();
const allcourseController = require('../controllers/allcourseController');

router.get('/', allcourseController.getAllCourses);
router.get('/:id', allcourseController.getCourseById); // Route to fetch course details by ID

module.exports = router;
