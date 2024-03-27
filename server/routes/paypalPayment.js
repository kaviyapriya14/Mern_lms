const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');

// Configure PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  'AX-tJ2-b8a2sHefYjIoDlNas-LtJAxvRfTQY-sxzs0gpIwVaf9r8zMgPJL51d-WcPG0jjMFqttB1-Vdr',
  'EIXIvjE2Xa7QPHFq0ZJnXbYH2HnvkgKY0xup9fzmIu6Mi7g2DYwurCdeV7_148l7GY4bgLSjM743s0i5'
);
const client = new paypal.core.PayPalHttpClient(environment);

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to handle PayPal payment
router.post('/payment', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: req.body.totalPrice
      }
    }]
  });

  try {
    const response = await client.execute(request);
    res.status(200).json({ orderId: response.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
