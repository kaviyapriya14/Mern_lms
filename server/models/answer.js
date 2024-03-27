const mongoose = require('mongoose');

// Define Answer Schema
const answerSchema = new mongoose.Schema({
    question_id: mongoose.Schema.Types.ObjectId,
    title: String
});

module.exports = mongoose.model('Answer', answerSchema);
