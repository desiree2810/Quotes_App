import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quotes from "./components/Quotes";
import Homescreen from "./components/Homescreen";
import Authors from "./components/Author/Authors";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import AddQuoteScreen from "./components/AddQuoteScreen";
import MyQuotes from "./components/AddQuoteScreen";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);      //to get different navbar for logged in user

  return (
    <>
      <Router>
      {/* <Navbar/> */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
        <Route path="/" element={ <ProtectedRoute Component={Homescreen}/> } />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/quotes" element={<Quotes isAuthenticated={isAuthenticated} />} />
          <Route path="/authors" element={<ProtectedRoute Component={Authors}/> } />
          <Route path="/addquote" element={<ProtectedRoute Component={AddQuoteScreen}/> } />
          <Route path="/myquotes" element={<ProtectedRoute Component={MyQuotes}/> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
