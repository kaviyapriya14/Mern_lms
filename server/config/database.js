const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kaviya:kaviyapriya@cluster0.phhsteg.mongodb.net/db_lms?retryWrites=true&w=majority';

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
