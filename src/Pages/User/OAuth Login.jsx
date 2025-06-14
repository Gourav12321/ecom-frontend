import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../Firebase.js";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import apiClient from "../../config/api.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function OAuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const payload = {
        email: result.user.email,
      };

      const response = await apiClient.post("/api/user/oAuthLogin", payload);

      // Store the token in cookies
      if (response.data.token) {
        Cookies.set("authToken", response.data.token, {
          expires: 1, // 1 day
          secure: true, // Use secure cookies in production
          sameSite: "strict",
        });
      }

      dispatch(
        setUser({
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          profile: response.data.user.profile,
          role: response.data.user.role,
        })
      );

      if (response.data.user.password === null) {
        toast.error("First setup your password");
        navigate("/setup-password", {
          state: { email: response.data.user.email },
        });
      } else {
        toast.success("Login Successfully");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error in OAuth:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <button
        type="button"
        className=" relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-gray-300 shadow-lg text-sm font-medium rounded-md "
        onClick={handleGoogle}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
          alt="google"
          className="w-7 h-7 mr-2"
        />
        Login With Google
      </button>
    </div>
  );
}

export default OAuthLogin;
