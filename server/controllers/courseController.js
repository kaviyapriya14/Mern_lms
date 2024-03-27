const Course = require('../models/course');

exports.createCourse = async (req, res) => {
    try {
        const { category_id, course_title } = req.body;
        const course = new Course({ category_id, course_title });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Failed to create course' });
    }
};
