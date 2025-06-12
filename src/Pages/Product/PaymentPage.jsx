import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const { state } = useLocation();
  const { selectedAddress, orderSummary } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create order
      const { data: orderData } = await axios.post('/api/order/add', {
        userEmail: user.email,
        products: orderSummary.products,
        shippingAddress: selectedAddress,
        totalAmount: orderSummary.totalAmount,
      });

      // Create payment intent
      const { data: paymentResponse } = await axios.post('/api/order/payment', {
        totalAmount: orderSummary.totalAmount,
        orderId: orderData.order._id,
        products: orderSummary.products,
      });

      const clientSecret = paymentResponse.clientSecret;
      const cardElement = elements.getElement(CardElement);

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
          },
        },
      });

      if (stripeError) {
        toast.error(stripeError.message);
        throw new Error(stripeError.message);
      }

      // Update order status and clear cart
      await axios.post('/api/order/update-status', { paymentIntentId: paymentIntent.id });
      await axios.post('/api/cart/clear', { email: user.email });

      toast.success('Payment Successful!');

      // Generate and open PDF
      const { data: pdfResponse } = await axios.post('/api/order/generate-pdf', {
        user,
        orderSummary: { ...orderSummary, orderId: orderData.order._id },
        selectedAddress
      });

      window.open(`https://ecommerce-webapp-1.onrender.com${pdfResponse.fileUrl}`, '_blank');
      navigate('/orders-history');

    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Payment processing failed. Please try again.');
      navigate('/cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='w-full h-screen -z-10 absolute left-0 right-0 bg-gray-100'></div>
      <div className="payment-page container mx-auto p-4 md:p-8 bg-gray-100 h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 pt-16 lg:pt-0">
          Complete Your Payment
        </h1>

        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Summary</h2>
          <div className="mb-4">
            {orderSummary.products.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                <p className="text-gray-700">{item.product.title} (x{item.quantity})</p>
                <p className="text-gray-900 font-semibold">Rs. {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-xl font-bold text-gray-800">
            Total: Rs. {orderSummary.totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Payment Information</h2>
          <div className="mb-6 border p-4 rounded-lg">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          {error && (
            <div className="mb-4 text-red-500 font-semibold">
              {error}
            </div>
          )}
          <button
            onClick={handlePayment}
            disabled={isLoading || !stripe || !elements}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
              isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
            <div className=' my-6 w-full'>
          <p className='text-center font-extrabold text-xl mb-3'>Test Card Information</p>
          <p className='w-full justify-between flex'>
          <span>Card Number:</span><span className='font-bold'>4242424242424242</span>
          </p>
          <p className='w-full justify-between flex'>
          <span>Month and Year: </span> <span className='font-bold'>12 / 34</span>
          </p>
          <p className='w-full justify-between flex'>
          <span>CVV:</span> <span className='font-bold'>567</span>
          </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
