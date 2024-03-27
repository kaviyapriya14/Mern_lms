// models/courselanding.js
const mongoose = require('mongoose');

const courseLandingSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    sectionIds: { type: String, required: true },
    lectureIds: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseSubtitle: { type: String },
    courseDescription: { type: String },
    courseLocale: { type: String },
    instructionalLevel: { type: String },
    courseCategory: { type: String },
    courseSubcategory: { type: String },
    topic: { type: String },
    courseImage: { type: String },
    promotionalVideo: { type: String }
});

module.exports = mongoose.model('CourseLanding', courseLandingSchema);
