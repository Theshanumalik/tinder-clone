import React, { useState } from "react";
import matches from "../users";
import { Chats } from "./Chats";
import Match from "./Match";

const ChatContainer = () => {
  const [matchActive, setMatchActive] = useState(true);
  const [chatActive, setChatActive] = useState(false);

  const toggleChatAndMatch = () => {
    setMatchActive(!matchActive);
    setChatActive(!chatActive);
  };

  const openSelectedChat = () => {
    setMatchActive(false);
    setChatActive(true);
  };
  return (
    <div className="chatContainer">
      <div className="chatNav">
        <button onClick={toggleChatAndMatch} disabled={matchActive}>
          Matches
        </button>
        <button onClick={toggleChatAndMatch} disabled={chatActive}>
          Messeges
        </button>
      </div>
      {matchActive && (
        <Match data={matches} openSelectedChat={openSelectedChat} />
      )}
      {chatActive && <Chats data={matches} />}
    </div>
  );
};

export default ChatContainer;
