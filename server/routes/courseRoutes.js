const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.post('/', async (req, res) => {
    try {
        const { category_id, course_title } = req.body;
        const course = new Course({ category_id, course_title });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Failed to create course' });
    }
});

router.get('/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ course });
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ error: 'Failed to fetch course details' });
    }
});

module.exports = router;
