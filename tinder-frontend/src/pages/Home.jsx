import React, { useState } from "react";
import Modal from "../components/Modal";
import Nav from "../components/Nav";
import Register from "../components/Register";
import "../css/home.css";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="home">
      <Nav />
      <div className="callToAction">
        <h1>Start something epic.</h1>
        <button onClick={() => setIsOpen(true)}>Create Account</button>
      </div>
      <Modal
        title="CREATE ACCOUNT"
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <Register />
      </Modal>
    </div>
  );
};

export default Home;
