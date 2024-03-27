import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useTotalPrice } from './TotalPriceContext';

const stripePromise = loadStripe('pk_test_51Ot96GSD7UDgGEp1AVVdMlOyEZ5lDQ0ZDcxffgSDk8czFArrdBUgp2JHxbV5YyqiojHbn4I0fHXs0E2xNY4Srb1l00WfRJk14n');

const Checkout = () => {
    const { totalPrice } = useTotalPrice();

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} />
        </Elements>
    );
};

export default Checkout;
