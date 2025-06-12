import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { setUser } from '../Redux/userSlice';
import { toast } from 'react-toastify';

import styles from '../../style';
import OAuthLogin from './OAuth Login';

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const [data, setData] = useState({});
  const [seen, setSeen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setSeen(!seen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    try {
      const response = await axios.post('/api/user/signin', data);
      if (response.data.success === true) {
        toast.success('Login Successfully');
        setTimeout(() => {
          dispatch(
            setUser({
              fullName: response.data.user.fullName,
              email: response.data.user.email,
              profile: response.data.user.profile,
              role: response.data.user.role,
            })
          );
        }, 1500);
       
        
        navigate('/');
      } 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold">Login To Your Account</h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={data.email || ''}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={seen ? 'text' : 'password'}
                  name="password"
                  required
                  value={data.password || ''}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={seen ? 'Hide password' : 'Show password'}
                >
                  {seen ? <IoEye className="text-gray-500" /> : <IoEyeOff className="text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable button while loading
                className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 ${
                  isLoading ? 'cursor-not-allowed bg-blue-400' : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
            <div>
              <OAuthLogin />
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
