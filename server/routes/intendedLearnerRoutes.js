const express = require('express');
const router = express.Router();
const IntendedLearner = require('../models/IntendedLearner');

// Route for storing user responses in intended_learner collection
router.post('/intended-learner', async (req, res) => {
    try {
        const { responses } = req.body; // Expecting an array of { questionId, userInput } objects

        // Iterate over each response and save it to the database
        for (const { questionId, userInput } of responses) {
            await IntendedLearner.create({
                question_id: questionId,
                user_input: userInput
            });
        }

        res.status(201).json({ message: 'User responses stored successfully' });
    } catch (error) {
        console.error('Error storing user responses:', error);
        res.status(500).json({ error: 'Failed to store user responses' });
    }
});

module.exports = router;
