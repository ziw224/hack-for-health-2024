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
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle logout error (e.g., display an error message)
    }
  };

  return (
    <div className="mainHome">
      <div className="appName">
        <h1>Solace Space</h1> {/* Application name */}
        <p>A safe place to share and heal together.</p>
      </div>
      <nav className="navigationBar">
        <Link to="/chatroom" className="navLink">
          Chat Room
        </Link>
        <a href="http://localhost:8080" className="navLink">
          Map
        </a>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </nav>
      {/* <footer className="footer">
         @ 2024 Shanghai Sharks. All rights reserved.
      </footer> */}
    </div>
  );
};

export default MainHome;
