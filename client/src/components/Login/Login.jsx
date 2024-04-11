import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";
import axios from "axios";

const handleGooglelogIn = () => {
  // Redirect the user to the backend route for Google OAuth authentication
  window.open(
    `${process.env.REACT_APP_API_URL}/login/auth/google/callback`,
    "_self"
  );
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);

  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post("/login", { email, password });
      if (response.data.error) {
        // If the response contains an error message, show it using toast
        toast.error(response.data.error);
      } else {
        // If login is successful, show a success message and set loggedIn state to true
        toast.success("Login successful!");
        // setLoggedIn(true);
        navigate("/", { state: { loggedIn: true } }); // Pass loggedIn state to HomePage upon successful login
      }
    } catch (error) {
      console.log(error);
      // Handle any errors
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <div className="body">
      <div className="main">
        <h1 className="header">Login</h1>
        <p className="text">Enter your login credentials</p>
        <form onSubmit={login}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login">
            <button type="submit" className="loginbutton">
              Login
            </button>
          </div>
          <div className="creat account">
            <Link to="/register" className="createaccountbutton">
              <button type="button">Create an account</button>
            </Link>
          </div>
          <div className="Logingoogle">
            <button type="button" className="Logingooglebutton" onClick={handleGooglelogIn}>
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
