const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const database = require('./config/database');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const intendedLearnerRoutes = require('./routes/intendedLearnerRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const quizRoutes = require('./routes/quizRoutes');
const courselandingRoutes = require('./routes/courselandingRoutes');
const priceRoutes = require('./routes/priceRoutes');
const allcourseRoute = require('./routes/allcourseRoute');
const config = require('./config/config');
const stripePaymentRouter = require('./routes/stripePayment');
const paypalPaymentRouter = require('./routes/paypalPayment');
const stripeWebhookRouter = require('./routes/webhooks'); // Import the webhook router




const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/api', questionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/course', courseRoutes);
app.use('/api', categoryRoutes);
app.use('/api', intendedLearnerRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/courselanding', courselandingRoutes);
app.use('/api', priceRoutes);
app.use('/api/allcourses', allcourseRoute);
app.use('/api/stripe', stripePaymentRouter);
app.use('/api/paypal', paypalPaymentRouter);
app.use('/api/webhooks', stripeWebhookRouter);






app.use('/uploads', express.static('./uploads'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
