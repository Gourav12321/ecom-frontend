// src/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe public key
export const stripePromise = loadStripe('pk_test_51PtkwTA2QU7LOEOQSIH1YKUAheMK8RfV8ZBSJBykcuurZpVDh9dGhlMajX91ZgT4EQfwcpwNWRzawwLKMDzNhhf000avUO7tgw');
