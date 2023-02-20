import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";
const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { state, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        inputs
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      if (res.data.user.gender) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" disabled={state.isFetching}>
          Log in
        </button>
        <p className="error-text">{state.error && state.error}</p>
      </form>
    </>
  );
};

export default Login;
