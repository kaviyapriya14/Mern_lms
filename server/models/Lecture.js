const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    lecture_title: {
        type: String,
        required: true
    },
    lecture_description: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
