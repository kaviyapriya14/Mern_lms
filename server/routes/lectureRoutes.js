const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// POST /api/lectures
router.post('/', upload.single('video'), lectureController.createLecture);

router.get('/:id', lectureController.getLectureDetails);


module.exports = router;
