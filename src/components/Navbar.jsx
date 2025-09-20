import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-x-3 text-xl font-bold hover:text-gray-200 transition"
        >
          LOGO
        </Link>

        {/* Links */}
        <div className="flex space-x-4 items-center">
          {!user && (
            <>
              <Link to="/sign-up" className="hover:text-gray-200 transition">
                SignUp
              </Link>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <button
                onClick={() => {
                  // navigate("/login");
                  localStorage.removeItem("access");
                  localStorage.removeItem("refresh");
                  setUser(false);
                  window.location.href = "/login";
                }}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
