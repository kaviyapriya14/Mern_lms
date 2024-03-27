const Question = require('../models/question');
const Answer = require('../models/answer');

const questionController = {
    async insertQuestionWithOptions(title, description, options) {
        try {
            const question = await Question.create({
                title,
                description
            });

            for (const optionText of options) {
                await Answer.create({
                    question_id: question._id,
                    title: optionText
                });
            }

            console.log("Question with options inserted successfully");
            return question;
        } catch (error) {
            console.error("Error inserting question with options:", error);
            throw error;
        }
    },

    async fetchQuestionsWithOptions() {
        try {
            const questions = await Question.find();

            const questionsWithOptions = await Promise.all(questions.map(async (question) => {
                const options = await Answer.find({ question_id: question._id });
                return {
                    ...question.toObject(),
                    options
                };
            }));

            return questionsWithOptions;
        } catch (error) {
            console.error("Error fetching questions with options:", error);
            throw error;
        }
    }
};

module.exports = questionController;
