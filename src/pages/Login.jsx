import axios from "axios";
import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        newUser
      );
      console.log(res.data);
      setUser(true);
      localStorage.setItem("access", res.data.accessToken);
      localStorage.setItem("refresh", res.data.refreshToken);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const onHandleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
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

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
