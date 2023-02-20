import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import matches from "../users";

const SwipeContainer = () => {
  const [lastDirection, setLastDirection] = useState();

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
