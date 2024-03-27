const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
    }
});

module.exports = mongoose.model('Result', resultSchema);
