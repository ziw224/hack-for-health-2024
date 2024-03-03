import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // Make sure you have a guard for an undefined chatId
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages.map(msg => ({
            ...msg,
            // Convert Firebase Timestamp to JavaScript Date object here if needed
            // Otherwise, you can pass the Firebase Timestamp directly
            timeStamp: msg.date ? new Date(msg.date.seconds * 1000) : null,
          })));
        }
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
