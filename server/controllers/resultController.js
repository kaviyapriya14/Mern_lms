const Result = require('../models/Result');

const resultController = {
    async createResult(questionId, answerId) {
        return await Result.create({ question_id: questionId, answer_id: answerId });
    }
};

module.exports = resultController;
