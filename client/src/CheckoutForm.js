import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css'

const Checkout = ({ totalPrice }) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [customerName, setCustomerName] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleStripePayment = async () => {
        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        country: country,
                        state: state
                    },
                    name: customerName
                }
            });

            if (error) {
                setPaymentError(error.message);
                setPaymentSuccess(null);
                return;
            }

            const { id } = paymentMethod;
            const response = await axios.post('http://localhost:5000/api/stripe/payment', {
                paymentMethodId: id,
                totalPrice: totalPrice
            });

            console.log(response.data); // Log success message
            setPaymentSuccess('Stripe payment successful!');
            setPaymentError(null);
        } catch (error) {
            console.error('Error processing payment with Stripe:', error);
            setPaymentError('Error processing payment with Stripe');
            setPaymentSuccess(null);
        }
    };

    const handlePayPalSuccess = async (details, data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/paypal/payment', {
                totalPrice: totalPrice
            });

            console.log(response.data);
            setPaymentSuccess('PayPal payment successful!');
            setPaymentError(null);
        } catch (error) {
            console.error('Error processing payment with PayPal:', error);
            setPaymentError('Error processing payment with PayPal');
            setPaymentSuccess(null);
        }
    };

    const handlePayPalError = (err) => {
        console.error('PayPal Error:', err);
        setPaymentError('Error processing payment with PayPal');
        setPaymentSuccess(null);
    };

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h2>Checkout</h2>
            </div>
            <div className="checkout-form">
                <form>
                    <label htmlFor="country">Country:</label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <label htmlFor="state">State:</label>
                    <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                    <label htmlFor="customer-name">Name:</label>
                    <input
                        id="customer-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                    <label htmlFor="card-element">Credit or debit card</label>
                    <CardElement id="card-element" className="card-element" />
                    <button className="stripe-button" type="button" onClick={handleStripePayment}>
                        Pay with Stripe
                    </button>
                </form>
            </div>
            <div className="paypal-button">
                <PayPalScriptProvider options={{ 'client-id': 'AX-tJ2-b8a2sHefYjIoDlNas-LtJAxvRfTQY-sxzs0gpIwVaf9r8zMgPJL51d-WcPG0jjMFqttB1-Vdr' }}>
                    <PayPalButtons
                        style={{ layout: 'horizontal' }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: totalPrice,
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            });
                        }}
                        onApprove={handlePayPalSuccess}
                        onError={handlePayPalError}
                    />
                </PayPalScriptProvider>
            </div>
            {paymentError && <p className="payment-error">{paymentError}</p>}
            {paymentSuccess && <p className="payment-success">{paymentSuccess}</p>}
        </div>
    );
};

export default Checkout;
