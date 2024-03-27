const { insertQuestionWithOptions } = require('./controllers/questionController');
const database = require('./config/database');

async function seedData() {
    try {
        /*   await insertQuestionWithOptions(
               "What kind of teaching have you done before?",
               "Select the type of teaching experience.",
               ["In person, informally", "In person, professionally", "Online", "Other"]
           );
   
           await insertQuestionWithOptions(
               "How much of video 'pro' are you?",
               "Select your level of expertise in video production.",
               ["I'm a beginner", "I have some knowledge", "I'm experienced", "I have a video ready to upload"]
           );
   
           await insertQuestionWithOptions(
               "Do you have an audience to share your course with?",
               "Select the size of your audience.",
               ["Not at the moment", "I have a small following", "I have a sizable following"]
           );
   
        await insertQuestionWithOptions(
            "First, let's find out what type of course you're making.",
            "Select the type of course you are creating.",
            ["Course", "Practice test"]
        );
*/

        console.log("Seed data inserted successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

// Call the function to seed data
seedData();
