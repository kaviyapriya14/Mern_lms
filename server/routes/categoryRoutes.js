const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Route to fetch categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
