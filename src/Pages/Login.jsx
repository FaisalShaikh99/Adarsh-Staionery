
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();




  const handleLogin = (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const localUser = allUsers.find(
      (u) =>
        u.email &&
        u.email.trim().toLowerCase() === normalizedEmail &&
        u.password === normalizedPassword
    );

    if (localUser) {
      localStorage.setItem("currentUser", JSON.stringify(localUser));
      dispatch(login(localUser));
      toast.success(`Welcome, ${localUser.name}`);
      navigate("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="flex flex-col md:flex-row bg-background shadow-xl rounded-xl overflow-hidden w-full max-w-[900px] mx-4">
        {/* Left Section */}
        <div className="hidden md:flex w-full md:w-1/2 bg-secondary flex-col justify-center items-center p-8">
          {/* Add a logo or illustration here if needed */}
          <h1 className="text-3xl font-bold text-accent mb-4">Welcome Back!</h1>
          <p className="text-text font-medium">
            Sign in to continue to your account
          </p>
        </div>

        {/* Right Section - Form */}

        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-background"
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Sign In</h2>

          <div className="text-center text-text font-medium my-3">
             Sign in with email
          </div>

          {/* Email Input */}
          <div className="flex items-center border rounded-lg mb-4 p-3">
            <MdEmail className="text-accent mr-3 text-xl" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background focus:outline-none text-text font-medium"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded-lg mb-6 p-3 relative">
            <RiLockPasswordFill className="text-accent mr-3 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={15}
              className="w-full bg-background focus:outline-none text-text font-medium"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="text-accent" />
              ) : (
                <FaEye className="text-accent" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-accent font-semibold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition mb-4"
          >
            Sign in <FaArrowRight className="text-xl" />
          </button>

          {/* Register Link */}
          <p
            className="text-accent font-semibold cursor-pointer text-center"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Create one
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
