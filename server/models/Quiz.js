const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quiz_title: { type: String, required: true },
    quiz_description: { type: String, required: true },
    questions: [
        {
            question_title: { type: String, required: true },
            answers: [
                {
                    answer_title: { type: String, required: true },
                    description: { type: String, required: true },
                },
            ],
            correct_answer_index: { type: Number, required: true },
        },
    ],

});

module.exports = mongoose.model('Quiz', quizSchema);
