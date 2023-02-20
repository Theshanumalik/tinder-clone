import { Logout } from "@mui/icons-material";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import "../css/dashboard.css";
import { AuthContext } from "../context/Auth";

const Dashboard = () => {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <main className="dashboard">
      <div className="dashboard-left">
        <div className="current-user-info">
          <h3>
            <img src={state.user.user.profile[0]} alt="" />
            {state.user.user.firstname}
          </h3>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>
            <Logout />
          </button>
        </div>
        <ChatContainer />
      </div>
      <div className="dashboard-right">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
