import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
import styles from "../../constants/styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const [data, setData] = useState({});
  const [seen, setSeen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setSeen(!seen);
  };

  const evaluatePasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[@$!%*?&#]/.test(password);

      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        strength = "Strong";
      } else if (
        hasUpperCase ||
        hasLowerCase ||
        hasNumbers ||
        hasSpecialChars
      ) {
        strength = "Medium";
      }
    }
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength !== "Strong") {
      toast.error("Please choose a stronger password.");
      return;
    }

    if (!data.fullName || !data.email || !data.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true); // Start loading

    try {
      await axios.post("/api/user/verifyMail", data);
      toast.info("Please Verify Your Email");
      navigate("/verify-email");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold">
          Register As A New User
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={data.fullName || ""}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={data.email || ""}
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
                  type={seen ? "text" : "password"}
                  name="password"
                  required
                  value={data.password || ""}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {seen ? (
                    <IoEye className="text-gray-500" />
                  ) : (
                    <IoEyeOff className="text-gray-500" />
                  )}
                </button>
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm font-medium ${
                    passwordStrength === "Strong"
                      ? "text-green-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength} Password
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
            <div>
              <OAuth />
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/sign-in" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
