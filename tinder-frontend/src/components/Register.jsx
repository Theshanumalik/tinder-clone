import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const { state, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (inputs.cpassword !== inputs.password) {
      return dispatch({
        type: "LOGIN_FAILURE",
        payload: "Password didn't matche.",
      });
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        inputs
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/onboarding");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <>
      <form action="/onboarding" onSubmit={handleRegister}>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            name="cpassword"
            id="password"
            value={state.cpassword}
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

export default Register;
