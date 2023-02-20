import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { AuthContext } from "../context/Auth";

const SwipeContainer = () => {
  const [lastDirection, setLastDirection] = useState();
  const [matches, setMatches] = useState([]);
  const { state } = useContext(AuthContext);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const generateBg = (url) => {
    return {
      background: `linear-gradient(rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.6)),
      url(${url})`,
    };
  };

  useLayoutEffect(() => {
    axios
      .get("http://localhost:5000/api/matches/recommendations", {
        headers: { token: state.user.token },
      })
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => console.log("something went wrong", err));
  }, []);
  return (
    <div className="cardContainer">
      {matches.map((user) => (
        <TinderCard
          className="swipe"
          key={user._id}
          onSwipe={(dir) => swiped(dir, user.firstname)}
          onCardLeftScreen={() => outOfFrame(user.firstname)}
        >
          <div style={generateBg(user.profile_image)} className="card">
            <div className="card-info">
              <h3>{user.firstname}</h3>
              <p>Hey! I am Someone. I like music and exploring new things.</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeContainer;
