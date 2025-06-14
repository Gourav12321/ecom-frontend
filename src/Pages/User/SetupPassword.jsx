import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../config/api.js";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
function SetupPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(calculateStrength(value));
  };

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@$!%*?&#]/.test(password)) score += 1;
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength < 3) {
      setError("Password is too weak.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await apiClient.post("/api/user/setup-password", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Password setup Succesfully!");
        toast.info("Please Sign In First To activate your Account");
        navigate("/sign-in");
      } else {
        setError("Password setup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during password setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Set Up Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {strength >= 3 ? (
              <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
            ) : (
              <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
            )}
          </div>
          <PasswordStrengthIndicator strength={strength} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {loading ? <CircularProgress size={24} /> : "Set Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordStrengthIndicator({ strength }) {
  const getColor = (strength) => {
    switch (strength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="h-2 w-full bg-gray-300 rounded-lg mt-2">
      <div
        className={`h-full ${getColor(strength)} rounded-lg`}
        style={{ width: `${(strength / 4) * 100}%` }}
      ></div>
    </div>
  );
}

export default SetupPassword;
