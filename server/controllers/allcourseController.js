const CourseLanding = require('../models/CourseLanding');
const Price = require('../models/Price');

exports.getAllCourses = async (req, res) => {
    try {
        const courseLandings = await CourseLanding.find();
        const coursePrices = await Price.find();

        const courses = courseLandings.map(course => {
            const price = coursePrices.find(price => String(price.savedCourseLandingId) === String(course._id));
            return {
                _id: course._id,
                courseId: course.courseId,
                sectionIds: course.sectionIds, 
                lectureIds: course.lectureIds,
                courseTitle: course.courseTitle,
                courseSubtitle: course.courseSubtitle,
                courseDescription: course.courseDescription,
                courseLocale: course.courseLocale,
                instructionalLevel: course.instructionalLevel,
                courseCategory: course.courseCategory,
                courseSubcategory: course.courseSubcategory,
                topic: course.topic,
                courseImage: course.courseImage,
                promotionalVideo: course.promotionalVideo,
                currency: price ? price.currency : null,
                priceTier: price ? price.priceTier : null
            };
        });

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id; // Extract the course ID from the request params
        const course = await CourseLanding.findById(courseId); // Find the course by ID using CourseLanding model
        if (!course) {
            return res.status(404).json({ message: 'Course not found' }); // Return a 404 if course is not found
        }
        res.json(course); // Return the course details
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};