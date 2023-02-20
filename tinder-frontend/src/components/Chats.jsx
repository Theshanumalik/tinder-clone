import React from "react";
import profile from "../images/profile.jpg";

export const Chats = ({ data }) => {
  return (
    <div className="chat">
      {data?.map((user) => (
        <div key={user._id} className="userItem">
          <img alt="" src={profile} />
          <div className="userInfo">
            <h3>{user.firstname}</h3>
            <span>{user.last_messege}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
