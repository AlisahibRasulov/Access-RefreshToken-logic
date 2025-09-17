import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const signUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        register
      );
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error(error, "error");
    }
  };

  const onHandleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          SignUp
        </h2>

        <input
          type="text"
          name="email"
          onChange={onHandleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          onChange={onHandleChange}
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="firstName"
          onChange={onHandleChange}
          placeholder="Firstname"
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="lastName"
          onChange={onHandleChange}
          placeholder="Lastname"
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={signUp}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignUp;
