import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./index.css";

export default function App() {
  const accessToken = localStorage.getItem("access");
  const [user, setUser] = useState(accessToken);

  return (
    <>
      {/* Navbar bütün səhifələrdə görünəcək */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/sign-Up" element={<SignUp />} />
        {/* Login səhifəsi */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          }
        />

        {/* Dashboard və nested routes */}
        <Route
          path="/dashboard/*"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
        </Route>

        {/* Default yönləndirmə */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
