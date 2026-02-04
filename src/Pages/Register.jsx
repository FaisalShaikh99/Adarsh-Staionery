import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus, FaUser, FaArrowRight, FaEye, FaEyeSlash
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  register,
  updateForm
} from "../features/authSlice"; // Adjust path if needed

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password } = useSelector((state) => state.auth.form);
  const users = useSelector((state) => state.auth.users);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (field, value) => {
    dispatch(updateForm({ field, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userExist = users.find((user) => user.email === email);
    if (userExist) {
      toast.error("User already exists!");
    } else {
      dispatch(register());
      toast.success("Registration successful!");
      navigate("/");
    }
  };

  return (
    <div className="bg-Background min-h-screen flex items-center justify-center text-accent">
      <div className="flex w-full max-w-6xl shadow-lg rounded-xl overflow-hidden mx-4">
        <div
          className="hidden md:flex flex-col items-center justify-center w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/11/7c/94/117c94eb1f1c7e0cfd871162d2db2381.jpg')",
          }}
        >
          <h1 className="text-accent text-5xl ml-3 mb-20 font-bold">
            Welcome to <span className="text-yellow-400">Stationery</span> World
          </h1>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mb-6">
              <FaUserPlus className="text-accent text-4xl mr-2" />
              <h2 className="text-3xl font-bold text-accent">
                Create an Account
              </h2>
            </div>

            <div className="flex items-center border rounded-lg mb-4 p-3">
              <FaUser className="text-accent mr-3 text-xl" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => handleInput("name", e.target.value)}
                required
                className="w-full focus:outline-none text-accent font-semibold"
              />
            </div>

            <div className="flex items-center border rounded-lg mb-4 p-3">
              <MdEmail className="text-accent mr-3 text-xl" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleInput("email", e.target.value)}
                required
                className="w-full focus:outline-none text-accent font-semibold"
              />
            </div>

            <div className="flex items-center border rounded-lg mb-6 p-3 relative">
              <RiLockPasswordFill className="text-accent mr-3 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password (8-15 characters)"
                value={password}
                onChange={(e) => handleInput("password", e.target.value)}
                required
                minLength={8}
                maxLength={15}
                className="w-full focus:outline-none text-accent font-semibold"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-accent" /> : <FaEye className="text-accent" />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-secondary font-semibold text-2xl p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary transition hover:text-accent"
            >
              Submit →
            </button>
            <p
              className="text-accent font-semibold cursor-pointer mt-4 text-center text-xl border py-2 border-accent rounded-lg hover:text-accent hover:bg-secondary transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Sign in
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
