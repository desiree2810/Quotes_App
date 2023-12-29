import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quotes from "./components/Quotes/Quotes";
import Homescreen from "./components/Homescreen/Homescreen";
import Authors from "./components/Author/Authors";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AddQuoteScreen from "./components/AddQuoteScreen/AddQuoteScreen";
import MyQuotes from "./components/MyQuotes/MyQuotes";
import Navbar from "./components/Header/Navbar/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./Pages/ErrorPage/PageNotFound";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);      //to get different navbar for logged in user

  return (
    <>
      <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <AllRoutes  isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}  />
      </Router>
    </>
  );
}

export default App;
