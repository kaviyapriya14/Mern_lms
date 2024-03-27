const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

// Route for inserting a question with options
router.post('/questions', async (req, res) => {
    const { title, description, options } = req.body;
    try {
        const question = await questionController.insertQuestionWithOptions(title, description, options);
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for fetching all questions with options
router.get('/questions', async (req, res) => {
    try {
        const questions = await questionController.fetchQuestionsWithOptions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
