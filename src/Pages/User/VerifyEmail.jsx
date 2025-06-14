import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../config/api.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const user = useSelector((state) => state.user.user);
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (user) {
          navigate('/');
          return;
        }

        if (!token) {
          navigate('/sign-in');
          return;
        }

        const response = await apiClient.get(`/api/user/verify-email?token=${token}`);
        if (response.data.success) {
          setStatus('success');
          toast.success('Email verified successfully!');
          toast.success('User has been Created');
          setTimeout(() => navigate('/sign-in'), 2000);
        } else {
          setStatus('failed');
          toast.error('Email verification failed. Please try again.');
        }
      } catch (error) {
        setStatus('failed');
        toast.error('An error occurred during email verification.');
        console.error('Error verifying email:', error);
      }
    };

    verifyEmail();
  }, [ token, navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <CircularProgress size={50} className="text-blue-500 mb-4" />
            <p className="text-xl font-semibold">Verifying your email...</p>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <p className="text-xl font-semibold">Email Verified!</p>
            <p className="text-gray-500 mt-2">Redirecting you to sign-in...</p>
          </>
        )}
        {status === 'failed' && (
          <>
            <CircularProgress size={50} className="text-blue-500 mb-4" />
            <p className="text-xl font-semibold">Please Verify your email...</p>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
