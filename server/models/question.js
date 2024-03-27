const mongoose = require('mongoose');

// Define Question Schema
const questionSchema = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Question', questionSchema);

