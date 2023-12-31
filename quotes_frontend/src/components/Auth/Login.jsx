import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../services/authService";

const Login = ({ setIsAuthenticated }) => {
  const navigateToHomepage = useNavigate();

  const [loginformData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // const baseURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setLoginFormData({
      ...loginformData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(`${baseURL}/auth/sign-in`,loginformData);
      const response = await authService.login(loginformData)

      console.log(response)
      if (response.status === 201) {
        // to store token in localstorage
        const token = response.data.token;
        localStorage.setItem('token', token);
        // console.log(`User logged in successfully with token = ${token}`)

        // to store userId in localstorage
        const encodedPayload =JSON.parse(atob(token.split('.')[1])) ;
        const encodedPayload_userId = encodedPayload.userId;
        // console.log(`User logged in successfully with userId = ${encodedPayload_userId}`);
        localStorage.setItem("userId", encodedPayload_userId); 


        // set name in localstorage
        const encodedPayload_firstName = encodedPayload.first_name;
        const encodedPayload_lastName = encodedPayload.last_name;
        localStorage.setItem("userFirstName", encodedPayload_firstName); 
        localStorage.setItem("userLastName", encodedPayload_lastName); 
        // console.log("==========",encodedPayload_firstName,encodedPayload_lastName)
        setIsAuthenticated(true);



        // to set all quotes Liked by user in localstorage
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
        
          if (token && userId) {
            const baseURL = import.meta.env.VITE_API_URL;
        
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(`${baseURL}/users/${userId}/favourite-quotes`,{ headers });

            let currentQuotes = response.data.quotes;
            console.log("liked quotes = ", currentQuotes);
        
            if (currentQuotes && Array.isArray(currentQuotes)) {
              // console.log("success");
              const storedLikedQuotes = JSON.parse(localStorage.getItem("likedQuotes")) || [];
              storedLikedQuotes.push(...currentQuotes);
              localStorage.setItem("likedQuotes", JSON.stringify(storedLikedQuotes));

              // console.log("All Liked Quotes:");
              // storedLikedQuotes.map((quote, index) => {
              //   console.log(`Quote ${index + 1}: ${quote.quote} | Author: ${quote.author}`);});
            } else {
              console.error("Liked quotes data might not be an array:",response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching liked quotes:", error);
        }
        

        // to set all quotes added by user in localstorage
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
        
          if (token && userId) {
            const baseURL = import.meta.env.VITE_API_URL;
        
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(`${baseURL}/quotes`, { headers });
            const addedQuotes = response.data.filter((quote) => quote.userId === userId);

            let currentQuotes = addedQuotes;
            console.log("added quotes = ", currentQuotes);
        
            if (currentQuotes && Array.isArray(currentQuotes)) {
              // console.log("success");
              const storedAddedQuotes = JSON.parse(localStorage.getItem("addedQuotes")) || [];
              storedAddedQuotes.push(...currentQuotes);
              localStorage.setItem("addedQuotes", JSON.stringify(storedAddedQuotes));

              // console.log("All Added Quotes:");
              // storedAddedQuotes.map((quote, index) => {
              //   console.log(`Quote ${index + 1}: ${quote.quote} | Author: ${quote.author}`);});
            } else {
              console.error("Added quotes data might not be an array:",response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching added quotes:", error);
        }



        // to set all quotes disliked by user in localstorage
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
        
          if (token && userId) {
            const baseURL = import.meta.env.VITE_API_URL;
        
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(`${baseURL}/users/${userId}/unfavourite-quotes`, { headers });

            let currentQuotes = response.data.quotes;
            console.log("disliked quotes = ", currentQuotes);
        
            if (currentQuotes && Array.isArray(currentQuotes)) {
              // console.log("success");
              const storedAddedQuotes = JSON.parse(localStorage.getItem("dislikedQuotes")) || [];
              storedAddedQuotes.push(...currentQuotes);
              localStorage.setItem("dislikedQuotes", JSON.stringify(storedAddedQuotes));

              // console.log("All Added Quotes:");
              // storedAddedQuotes.map((quote, index) => {
              //   console.log(`Quote ${index + 1}: ${quote.quote} | Author: ${quote.author}`);});
            } else {
              console.error("Added quotes data might not be an array:",response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching disliked quotes:", error);
        }

        // to store remaining quotes in local storage
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
    
          if (token && userId) {
            const baseURL = import.meta.env.VITE_API_URL;
    
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
    
            // Fetch all quotes
            const response = await axios.get(`${baseURL}/quotes`, { headers });
    
            const allQuotes = response.data;
            console.log("======================")

            const addedQuotes = JSON.parse(localStorage.getItem("addedQuotes")) || [];
            const likedQuotes = JSON.parse(localStorage.getItem("likedQuotes")) || [];
            const dislikedQuotes = JSON.parse(localStorage.getItem("dislikedQuotes")) || [];
    
            if (allQuotes && Array.isArray(allQuotes)) {
              const existingQuotes = allQuotes.filter(
                (quote) =>
                  !addedQuotes.some((addedQuote) => addedQuote.id === quote.id) &&
                  !likedQuotes.some((likedQuote) => likedQuote.id === quote.id) &&
                  !dislikedQuotes.some((dislikedQuote) => dislikedQuote.id === quote.id)
              );
    
              // console.log("success");
              const storedExistingQuotes = JSON.parse(localStorage.getItem("existingQuotes")) || [];
              storedExistingQuotes.push(...existingQuotes);
              localStorage.setItem("existingQuotes", JSON.stringify(storedExistingQuotes));
    
              // console.log("All Existing Quotes:");
              // storedExistingQuotes.map((quote, index) => {
              //   console.log(`Quote ${index + 1}: ${quote.quote} | Author: ${quote.author}`);
              // });
            } else {
              console.error("All quotes data might not be an array:", response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching existing quotes:", error);
        }

 
        // Redirect to the homepage after successful login
        navigateToHomepage("/");
      } else {
        console.error("Failed to login user");
      }
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
    
  };

  useEffect(() =>{
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
      navigateToHomepage("/");
    }
  },[])

  return (
    <div
      className=" container d-flex justify-content-center align-items-center vh-100 p-5"
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
              <button type="submit" className="btn btn-primary mr-5 px-3 ">
                Login
              </button>
              <Link to="/signup">
                <button className="btn btn-warning px-1 ">Signup</button>
              </Link>
            </div>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default Login;
