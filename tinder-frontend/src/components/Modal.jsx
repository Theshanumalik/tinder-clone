import { CloseOutlined } from "@mui/icons-material";
import ReactDOM from "react-dom";
import "../css/modal.css";
import logo from "../images/colorLogo.png";

const Modal = ({ children, isOpen, closeModal, title }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal">
        <button className="close-modal" onClick={closeModal}>
          <CloseOutlined />
        </button>
        <div className="modal-title-bar">
          <img className="modal-logo" src={logo} alt="tinder logo" />
          <h3>{title}</h3>
          <p>
            By clicking Log In, you agree to our terms. Learn how we process
            your data in our Privacy Policy and Cookie Policy.
          </p>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
