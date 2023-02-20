import React from "react";
import profile from "../images/profile.jpg";

const Match = ({ data, openSelectedChat }) => {
  return (
    <div className="match">
      {data?.map((user) => (
        <div key={user._id} className="userItem">
          <img src={profile} alt="" />
          <div className="userInfo">
            <h3>{user.firstname}</h3>
            <div className="matchAction">
              <button onClick={() => console.log("hello world")}>Accept</button>
              <button onClick={() => console.log("hello world")}>denied</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Match;
