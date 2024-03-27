const IntendedLearner = require('../models/IntendedLearner');

exports.submitIntendedLearner = async (req, res) => {
    const { questionId, userInput } = req.body;

    try {
        const intendedLearner = await IntendedLearner.create({
            question_id: questionId,
            user_input: userInput
        });

        res.status(201).json(intendedLearner);
    } catch (error) {
        console.error('Error submitting intended learner data:', error);
        res.status(500).json({ error: 'Failed to submit intended learner data' });
    }
};
