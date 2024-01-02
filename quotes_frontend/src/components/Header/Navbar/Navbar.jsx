import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAuthenticated, setIsAuthenticated }) {

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  console.log(token,"---------", userId);

  if (token && userId){
    setIsAuthenticated(true);
  }

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setIsAuthenticated(false);
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("likedQuotes")
    localStorage.removeItem("addedQuotes")
    localStorage.removeItem("dislikedQuotes")
    localStorage.removeItem("existingQuotes")
    setIsAuthenticated(false);
  };
  return (
    <div className="NavContainer">
      <nav className="navbar navbar-expand-lg navbar-dark custom-bg-color">
        <span style={{ fontWeight: "bold" }}>
          <Link to="/" className="navbar-brand">
            Software Quotes
          </Link>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/authors" className="nav-link">
                    Authors
                  </Link>
                </li>
                <li>
                  <Link to="/myquotes" className="nav-link">
                    My Quotes
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link to="/quotes" className="nav-link">
                Quotes
              </Link>
            </li>
          </ul>

          {!isAuthenticated ? (
            <Link to="/login" className="btn btn my-2 my-sm-0">
              <button className="btn btn my-2 my-sm-0">Login</button>
            </Link>
          ) : (
            <Link to="/quotes" className="btn btn my-2 my-sm-0">
              <button className="btn btn my-2 my-sm-0" onClick={handleLogout}>Logout</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
