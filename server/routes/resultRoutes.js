const express = require('express');
const router = express.Router();
const Result = require('../models/result');

// POST route to handle submission of selected options
router.post('/submit', async (req, res) => {
    try {
        const selectedOptions = req.body;
        const results = [];

        // Iterate through selected options and save each result
        for (const questionId in selectedOptions) {
            const answerId = selectedOptions[questionId];
            const result = await Result.create({
                question_id: questionId,
                answer_id: answerId
            });
            results.push(result);
        }

        res.status(201).json(results);
    } catch (error) {
        console.error('Error submitting options:', error);
        res.status(500).json({ error: 'Failed to submit options' });
    }
});

module.exports = router;
