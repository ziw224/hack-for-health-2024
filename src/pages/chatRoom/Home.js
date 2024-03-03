import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext"; // Make sure the path is correct
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ChatContext);

  const handleReturn = () => {
    // Dispatch an action to reset the chat
    dispatch({ type: "RESET_CHAT" });
    // Navigate to the main home
    navigate("/");
  };

  return (
    <div className="home">
      <button className="returnButton" onClick={handleReturn}>
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
