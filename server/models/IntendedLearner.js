const mongoose = require('mongoose');

const IntendedLearnerSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'question' // Reference to the Question model
    },
    user_input: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('IntendedLearner', IntendedLearnerSchema);
