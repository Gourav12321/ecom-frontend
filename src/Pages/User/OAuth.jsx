import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../Firebase.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
function OAuth() {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const displayName = result.user.displayName || "";
  
      const payload = {
        fullName : displayName,
        email: result.user.email,
        profile: result.user.photoURL
      };
  
      const response = await axios.post('/api/user/oAuth', payload);
  
  
      if (response.data.success) {
      toast.success("SignUp Successfully Please Setup your Password");
        navigate('/setup-password', { state: { email: result.user.email } });
      } else {
        toast.error('OAuth registration failed. Please try again.');
      }
    } catch (error) {
      toast.error( error.response?.data.message || error.message);
    }
  };
  

  return (
    <div>
      <button
        type='button'
        className=' relative w-full h-[40px] flex items-center justify-center py-2 px-4 border border-gray-300 shadow-lg text-sm font-medium rounded-md '
        onClick={handleGoogle}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="google" className='w-7 h-7 mr-2' />
        Sign Up With Google
      </button>

    </div>
  );
}

export default OAuth;
