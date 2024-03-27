const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.post('/prices', priceController.createPrice);
router.get('/prices/:id', priceController.getPriceById);


module.exports = router;
