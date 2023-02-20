import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import profile from "../images/profile.jpg";

export const Chats = () => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    axios
      .get("http://localhost:5000/api/matches/", {
        headers: { token: state.user.token },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("something went wrong", err));
  }, []);
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
