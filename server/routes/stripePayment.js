// routes/stripePayment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51Ot96GSD7UDgGEp1BZ0CcDIsFyiZx2H6rY8HHewPeZPJjNielnbGGeYeB5RL5Nsr0s1HRrmJjoKdeCUsaBn9pkbz003kbsdvuJ');

router.post('/payment', async (req, res) => {
    try {
        const { paymentMethodId, totalPrice } = req.body;
        // Convert totalPrice to cents
        const amountInCents = Math.round(totalPrice * 100);
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'http://localhost:3000/home' // Specify your return URL here
        });
        res.status(200).json({ message: 'Payment succeeded', paymentIntent });
    } catch (error) {
        console.error('Error processing payment with Stripe:', error);
        res.status(500).json({ error: 'Error processing payment with Stripe' });
    }
});

module.exports = router;
