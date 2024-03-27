//lectureController.js
const Lecture = require('../models/Lecture');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

exports.createLecture = async (req, res) => {
    try {
        const { section_id, lecture_title, lecture_description } = req.body;
        const { path: videoPath, filename: videoFilename } = req.file;

        // Use fluent-ffmpeg to get the duration of the video
        ffmpeg.ffprobe(videoPath, async (err, metadata) => {
            if (err) {
                console.error('Error getting video duration:', err);
                return res.status(500).json({ success: false, message: 'Failed to process video' });
            }

            const durationInSeconds = metadata.format.duration;
            const durationInMinutes = durationInSeconds / 60;

            const lecture = new Lecture({
                section_id,
                lecture_title,
                lecture_description,
                video_url: `http://localhost:5000/uploads/${videoFilename}`, // Assuming the videos are served from '/uploads' directory
                duration: durationInMinutes
            });

            await lecture.save();

            // Return the created lecture data as a response
            res.status(201).json({ success: true, message: 'Lecture created successfully', lecture });
        });
    } catch (error) {
        console.error('Error creating lecture:', error);
        res.status(500).json({ success: false, message: 'Failed to create lecture' });
    }
};
exports.getLectureDetails = async (req, res) => {
    try {
        const lectureId = req.params.id;
        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({ success: false, message: 'Lecture not found' });
        }

        // Return the lecture details
        res.status(200).json({ success: true, lecture });
    } catch (error) {
        console.error('Error fetching lecture details:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch lecture details' });
    }
};
