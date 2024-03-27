const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.post('/', async (req, res, next) => {
    try {
        const { lecture_id, quiz_title, quiz_description, questions } = req.body;

        const newQuiz = new Quiz({
            lecture_id,
            quiz_title,
            quiz_description,
            questions,
        });

        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully!' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
