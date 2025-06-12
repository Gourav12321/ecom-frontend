import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Pages/Redux/Store';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './Stripe.js';  // Make sure to create the stripePromise in a separate file as discussed earlier.
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Elements stripe={stripePromise}>
        <App />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </Elements>
    </PersistGate>
  </Provider>
);
