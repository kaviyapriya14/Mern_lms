const Price = require('../models/Price');

exports.createPrice = async (req, res) => {
  try {
    const { savedCourseLandingId, currency, priceTier } = req.body;
    const price = new Price({ savedCourseLandingId, currency, priceTier });
    await price.save();
    res.status(201).json({ success: true, data: price });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findById(id);
    if (!price) {
      return res.status(404).json({ success: false, error: 'Price not found' });
    }
    res.status(200).json({ success: true, data: price });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

