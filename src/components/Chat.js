import React, { useContext } from "react";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  // Check if a chat user has been selected
  const isChatSelected = data.user !== undefined && data.user !== null;

  return (
    <div className="chat">
      {isChatSelected ? (
        <>
          <div className="chatInfo">
            <span>{data.user.displayName}</span>
            <div className="chatIcons">
              <img src={More} alt="" />
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        // Display a placeholder or leave it empty if no chat is selected
        <div className="no-chat-selected">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default Chat;