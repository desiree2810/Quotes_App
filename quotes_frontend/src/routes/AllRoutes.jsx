import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "../components/Homescreen/Homescreen";
import Authors from "../components/Author/Authors";
import AddQuoteScreen from "../components/AddQuoteScreen/AddQuoteScreen";
import MyQuotes from "../components/MyQuotes/MyQuotes";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Quotes from "../components/Quotes/Quotes";
import PageNotFound from "../Pages/ErrorPage/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={Homescreen} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/quotes"
        element={<Quotes isAuthenticated={isAuthenticated} />}
      />
      <Route path="/authors" element={<ProtectedRoute Component={Authors} />} />
      <Route
        path="/addquote"
        element={<ProtectedRoute Component={AddQuoteScreen} />}
      />
      <Route
        path="/myquotes"
        element={<ProtectedRoute Component={MyQuotes} />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
