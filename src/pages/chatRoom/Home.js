import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import "./Home.css"; // Make sure you have this CSS file in the same directory as your Home component

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button className="returnButton" onClick={() => navigate("/")}>
        Return to Main Home
      </button>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
