import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import profile from "../images/profile.jpg";

const Match = ({ openSelectedChat }) => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    axios
      .get("http://localhost:5000/api/matches/requests", {
        headers: { token: state.user.token },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("something went wrong", err));
  }, []);
  return (
    <div className="match">
      {data.length === 0 && (
        <div>
          <p>No Request Found.</p>
        </div>
      )}
      {data?.map((user) => (
        <div key={user._id} className="userItem">
          <img src={profile} alt="" />
          <div className="userInfo">
            <h3>{user.from.firstname}</h3>
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
