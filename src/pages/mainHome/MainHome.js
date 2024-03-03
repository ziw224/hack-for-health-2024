import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import "./MainHome.css"; // Make sure to create this CSS file

const MainHome = () => {
  const navigate = useNavigate(); // if you need to navigate after logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle logout error (e.g., display an error message)
    }
  };

  return (
    <div className="mainHome">
      <nav className="navigationBar">
        <div className="appName">
          <h1>Harbor Haven</h1> {/* Application name */}
          <p>A safe place to share and heal together.</p>
        </div>
        <Link to="/chatroom" className="navLink">
          Chat Room
        </Link>
        <Link to="/map" className="navLink">
          Map
        </Link>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default MainHome;
