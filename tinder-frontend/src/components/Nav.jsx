import React, { useState } from "react";
import "../css/nav.css";
import ColorLogo from "../images/tinder_logo_white.png";
import LanguageIcon from "@mui/icons-material/Language";
import Login from "./Login";
import Modal from "./Modal";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="navbar">
      <img src={ColorLogo} alt="tinder logo" className="logo" />
      <nav>
        <ul>
          <li>Product</li>
          <li>Learn</li>
          <li>Safety</li>
          <li>Support</li>
          <li>Download</li>
        </ul>
      </nav>

      <div className="nav-action">
        <span>
          <LanguageIcon /> English
        </span>
        <button onClick={() => setIsOpen(true)}>Log in</button>
      </div>
      <Modal
        title="GET STARTED"
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <Login />
      </Modal>
    </header>
  );
};

export default Nav;
