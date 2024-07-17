import React, { useState } from "react";
import "./Loginpage.css";
import { useEffect } from "react";
import {
  emailValidator,
  passwordValidator,
} from "../../validate/regexValidator";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  useEffect(() => {
    document.body.classList.add("my-body-class");
    return () => {
      document.body.classList.remove("main-body");
      document.body.classList.remove("myntra-forward");
      document.body.classList.remove("Flipkart");
      document.body.classList.remove("Myntra-asp");
      document.body.classList.remove("Amazon-asp");
    };
  }, []);

  const [input, setInput] = useState({ username: "", password: "" });
  const [successMessage, setsuccessMessage] = useState("");
  const [error2, setError2] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  console.log(input);

  const handlesubmit = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitter = (e) => {
    e.preventDefault();
    // console.log(input.username ,input.password)
    setsuccessMessage("");
    if (!emailValidator(input.username)) {
      seterrorMessage("Please enter valid email id");
      return;
    }

    if (!passwordValidator(input.password)) {
      seterrorMessage(
        "Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and special characters"
      );
      return;
    }

    // if(input.email !== 'admin@a.com' || input.password !== 'Password@1')  {
    // 	seterrorMessage('Invalid email or password');
    // 	return;
    // }
    // if(input.email === "admin@a.com" && input.password === "Password@1"){
    if (
      input.username === "admin@gmail.com" &&
      input.password === "Password@1"
    ) {
      navigate("/");
      localStorage.setItem("auth", true);
    } else {
      seterrorMessage("Invalid email or password");
    }
    // if(input.email !== 'client@a.com' || input.password !== 'Password@2')  {
    // 	seterrorMessage('Invalid email or password');
    // 	return;
    // }
    if (input.email === "client@gmail.com" && input.password === "Password@2") {
      navigate("/");
      localStorage.setItem("client", true);
    } else {
      seterrorMessage("Invalid email or password");
    }
    // if(input.email !== 'user@a.com' || input.password !== 'Password@3')  {
    // 	seterrorMessage('Invalid email or password');
    // 	return;
    // }
    if (
      input.username === "user@gmail.com" &&
      input.password === "Password@3"
    ) {
      navigate("/");
      localStorage.setItem("user", true);
    } else {
      seterrorMessage("Invalid email or password");
    }

    setsuccessMessage("Successfully Validated");
  };

  return (
    <div>
      <nav className="login">
        {/* <a href="#"><img src="images/logo.svg" alt="logo"/></a>  */}
        <h1 className="logo">Brandfortunes</h1>
      </nav>
      <div className="form-wrapper">
        <h2 className="login">Sign In</h2>
        <form className="login" action="#">
          <div className="form-control1">
            <input
              className="login"
              type="text"
              name="username"
              onChange={handlesubmit}
              required
            />
            <label className="login">Email or phone number</label>
          </div>
          <div className="form-control1">
            <input
              className="login"
              type="password"
              name="password"
              onChange={handlesubmit}
              required
            />
            <label className="login">Password</label>
          </div>
          <button className="login" type="submit" onClick={formSubmitter}>
            Sign In
          </button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label className="login" for="remember-me">
                Remember me
              </label>
            </div>
            <a className="login" href="#">
              Need help?
            </a>
          </div>
        </form>
        {errorMessage.length > 0 && <div id="alert">{errorMessage}</div>}
        {error2.length > 0 && <div id="alert">{error2}</div>}
        <p className="login">
          New to Brandfortunes? <a href="#">Sign up now</a>
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#">Learn more.</a>
        </small>
      </div>
    </div>
  );
};

export default Loginpage;
