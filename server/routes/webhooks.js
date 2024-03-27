// routes/webhooks.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51Ot96GSD7UDgGEp1BZ0CcDIsFyiZx2H6rY8HHewPeZPJjNielnbGGeYeB5RL5Nsr0s1HRrmJjoKdeCUsaBn9pkbz003kbsdvuJ'); // Replace 'your_stripe_secret_key' with your actual Stripe secret key

// Webhook endpoint to handle Stripe events
router.post('/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, 'your_stripe_webhook_secret'); // Replace 'your_stripe_webhook_secret' with your actual Stripe webhook secret
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful:', paymentIntent);
            // Custom logic for handling successful payment
            break;
        case 'payment_intent.payment_failed':
            const paymentFailedIntent = event.data.object;
            console.log('PaymentIntent failed:', paymentFailedIntent);
            // Custom logic for handling failed payment
            break;
        // Handle other event types if needed
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

module.exports = router;
