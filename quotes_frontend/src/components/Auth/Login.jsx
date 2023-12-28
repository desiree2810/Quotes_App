import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../services/authService";


const Login = ({ setIsAuthenticated }) => {
  const navigateToHomepage = useNavigate();
  const [loginformData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const baseURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setLoginFormData({
      ...loginformData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/auth/sign-in`,
        loginformData
      );
      // const response = await authService.login(loginformData);

      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log(`User logged in successfully with token = ${token}`)
        const encodedPayload =JSON.parse(atob(token.split('.')[1])) ;
        const encodedPayload_userId = encodedPayload.userId;
        console.log(`User logged in successfully with userId = ${encodedPayload_userId}`);
        localStorage.setItem("userId", encodedPayload_userId); 
        setIsAuthenticated(true);

        // Redirect to the homepage after successful login
        navigateToHomepage("/");
      } else {
        console.error("Failed to login user");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className=" container d-flex justify-content-center align-items-center vh-100"
      style={{ padding: "10px" }}
    >
      <div
        className="card p-4"
        style={{
          display: "flex",
          backgroundColor: "#8ec777",
          width: "43rem",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <h2 className="card-title text-left mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email: example@email.com"
              value={loginformData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="buttonset">
              {/* <small style={{ fontSize: "0.7rem" }}>Already have an account? </small>
            <a href="#" style={{ color: "blue", fontSize: 'small', marginLeft: '5px' }}>Login</a> */}
              <button type="submit" className="btn btn-primary mr-5 px-3 py-2">
                Login
              </button>
              <Link to="/signup">
                <button className="btn btn-warning px-3 py-2">Signup</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
