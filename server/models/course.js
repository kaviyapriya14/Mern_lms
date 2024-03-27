const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true
    },
    course_title: {
        type: String,
        required: true
    },

});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
