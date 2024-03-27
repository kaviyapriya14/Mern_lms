const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    savedCourseLandingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseLanding',
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    priceTier: {
        type: String,
        required: true
    }
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
