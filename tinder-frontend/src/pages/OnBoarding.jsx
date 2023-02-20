import { AddAPhoto } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import "../css/onboarding.css";

const OnBoarding = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstname: "",
    dateOfBirth: null,
    gender: "",
    email: "",
    intrestedIn: "",
    aboutMe: "",
    yyyy: "",
    mm: "",
    dd: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const makeActive = (field, value) => {
    if (inputs[field] === value) return "active";
    return "";
  };

  const makeSelected = (field, value) => {
    if (inputs[field] === value) return true;
    return false;
  };

  useLayoutEffect(() => {
    const getUserInformation = async () => {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          token: state.user.token,
        },
      });
      if (!res.data.gender) {
        return setInputs({ ...inputs, email: res.data.email });
      }
      setInputs({
        firstname: res.data.firstname,
        dateOfBirth: res.data.dateOfBirth,
        gender: res.data.gender,
        intrestedIn: res.data.intrestedIn,
        aboutMe: res.data.aboutMe,
        email: res.data.email,
        yyyy: new Date(res.data.dateOfBirth).getFullYear(),
        mm: new Date(res.data.dateOfBirth).getMonth() + 1,
        dd: new Date(res.data.dateOfBirth).getDate(),
      });
    };
    getUserInformation();
  }, [state.user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.gender || !inputs.intrestedIn)
      return alert("PLEASE SELCET GENDER AND INTRESTED IN");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile",
        {
          firstname: inputs.firstname,
          dateOfBirth: new Date(`${inputs.yyyy}-${inputs.mm}-${inputs.dd}`),
          gender: inputs.gender,
          profile: ["http://theshanumalik.netlify.app/img/profile.jpg"],
          intrestedIn: inputs.intrestedIn,
          aboutMe: inputs.aboutMe,
        },
        { headers: { token: state.user.token } }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/dashboard");
    } catch (error) {
      alert("SOMETHING WENT WRONG");
    }
  };
  return (
    <div className="onboardingContainer">
      <h1>PERSONAL INFORMATION</h1>
      <form onSubmit={handleSubmit}>
        <div className="onBoardingFormField">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="firstname"
            value={inputs.firstname}
            id="first_name"
            placeholder="First name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="onBoardingFormField">
          <label>Birthday</label>
          <div className="multivalued-form-field short">
            <input
              type="text"
              name="dd"
              placeholder="DD"
              value={inputs.dd}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mm"
              placeholder="MM"
              value={inputs.mm}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="yyyy"
              placeholder="YYYY"
              value={inputs.yyyy}
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="onBoardingFormField">
          <label>Gender</label>
          <div className="multivalued-form-field">
            <input
              type="radio"
              name="gender"
              value={"male"}
              id="user-gender-male"
              onChange={handleChange}
              required
              checked={makeSelected("gender", "male")}
            />
            <label
              htmlFor="user-gender-male"
              className={makeActive("gender", "male")}
            >
              Male
            </label>
            <input
              type="radio"
              name="gender"
              value="female"
              id="user-gender-female"
              onChange={handleChange}
              required
              checked={makeSelected("gender", "female")}
            />
            <label
              htmlFor="user-gender-female"
              className={makeActive("gender", "female")}
            >
              Female
            </label>
            <input
              type="radio"
              name="gender"
              value="other"
              id="user-gender-other"
              onChange={handleChange}
              required
              checked={makeSelected("gender", "other")}
            />
            <label
              htmlFor="user-gender-other"
              className={makeActive("gender", "other")}
            >
              Other
            </label>
          </div>
        </div>

        <div className="onBoardingFormField">
          <label>Show me</label>
          <div className="multivalued-form-field">
            <input
              type="radio"
              name="intrestedIn"
              value={"male"}
              required
              onChange={handleChange}
              id="show-me-gender-male"
              checked={makeSelected("intrestedIn", "male")}
            />
            <label
              htmlFor="show-me-gender-male"
              className={makeActive("intrestedIn", "male")}
            >
              Male
            </label>
            <input
              type="radio"
              name="intrestedIn"
              value={"female"}
              onChange={handleChange}
              checked={makeSelected("intrestedIn", "female")}
              id="show-me-gender-female"
              required
            />
            <label
              htmlFor="show-me-gender-female"
              className={makeActive("intrestedIn", "female")}
            >
              Female
            </label>
            <input
              type="radio"
              name="intrestedIn"
              id="show-me-gender-other"
              value={"other"}
              required
              checked={makeSelected("intrestedIn", "other")}
              onChange={handleChange}
            />
            <label
              htmlFor="show-me-gender-other"
              className={makeActive("intrestedIn", "other")}
            >
              Other
            </label>
          </div>
        </div>
        <div className="onBoardingFormField">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={inputs.email}
            id="email"
            placeholder="Your email address"
            readOnly
          />
        </div>
        <div className="onBoardingFormField">
          <label htmlFor="about-me">About me</label>
          <textarea
            type="text"
            id="about-me"
            name="aboutMe"
            onChange={handleChange}
            placeholder="Hey I am..."
            required
            value={inputs.aboutMe}
          ></textarea>
        </div>

        <div className="photoUploadSection">
          <div className="profilePhotoPreview">
            <label htmlFor="profile">Choose profile</label>
          </div>
          <input type="file" name="profile" id="profile" />
          <label htmlFor="profile">
            <AddAPhoto />
          </label>
        </div>
        <button>Continue</button>
      </form>
    </div>
  );
};

export default OnBoarding;
