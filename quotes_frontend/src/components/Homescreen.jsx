import React from "react";
import "../css/Homescreen.css";
import Navbar from "./Navbar";

function Homescreen() {
  return (
    <div className="HomescreenContainer">
      {/* <Navbar/> */}
      <div className="centerContent">
        <h1>Home Screen</h1>
        <h2>Display Random Quote here</h2>
      </div>
    </div>
  );
}

export default Homescreen;
