import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quotes from "./components/Quotes";
import Homescreen from "./components/Homescreen";
import Authors from "./components/Authors";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
