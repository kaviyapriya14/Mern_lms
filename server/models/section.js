const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
        required: true
    },
    section_title: {
        type: String,
        required: true
    },
    section_file_path: {
        type: String,
        default: null
    },
    youtube_url: {
        type: String,
        default: null
    },
    vimeo_url: {
        type: String,
        default: null
    }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
