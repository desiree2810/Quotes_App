import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./Quotes.css";

function Quotes({ isAuthenticated }) {
  const [quotes, setQuotes] = useState([]);
  const [filterType, setFilterType] = useState("Author");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const loggedInUserId = localStorage.getItem("userId");

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchQuotes();
  }, [location.search]);

  const fetchQuotes = async () => {
    try {
      let url = `${baseURL}/quotes`;

      const searchParam = location.search;
      if (searchParam) {
        url += searchParam;
      }

      const response = await axios.get(url);
      const arrayOfQuotes = response.data;
      console.log(arrayOfQuotes);

      if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
        setQuotes(arrayOfQuotes);
      } else {
        console.log("Empty array or invalid data format");
      }
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  const handleSearch = async () => {
    try {
      let url = `${baseURL}/quotes`;

      if (filterType === "Author") {
        url += `?author=${searchTerm}`;
      } else if (filterType === "Quote") {
        url += `?quote=${searchTerm}`;
      } else if (filterType === "Tag") {
        url += `?tag=${searchTerm}`;
      }

      const response = await axios.get(url);
      const arrayOfQuotes = response.data;

      if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
        setQuotes(arrayOfQuotes);
      } else {
        console.log("No quotes found for the specified filter and search term");
      }
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setFilterType("Author");
    fetchQuotes();
  };

  return (
    <div className="scrollable-page">
      <div className="title-div">Quotes</div>
      <div className="main-sub">
        {isAuthenticated && (
          <div className="button-container d-flex align-items-center">
            <Link to="/addquote" className="btn btn my-2 my-sm-0 addQuoteBtn">
              Add Quote ➕
            </Link>

            <div className="search-container ml-auto d-flex">
              <select
                className="form-control mr-2"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="Author">Author</option>
                <option value="Quote">Quote</option>
                <option value="Tag">Tag</option>
              </select>

              <input
                type="text"
                className="form-control mr-2"
                placeholder={`Enter ${filterType.toLowerCase()}'s name`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="btn btn-dark mr-2" onClick={handleSearch}>
                Search
              </button>

              <button className="btn btn-light" onClick={handleRefresh}>
                Refresh
              </button>
            </div>
          </div>
        )}

      {/* {quotes.map((quote, index) => (
          <blockquote key={index}>
            {quote.quote}
            <span>{quote.author}</span>
            <div className="userAdded">{quote.userId === loggedInUserId && "👌"}</div>
          </blockquote>
          
      ))} */}



        <div className="main-container">
          <div>
          {quotes.map((quote, index) => (
            <div className="quote-container" key={index}>
              <p className="quote-message">{quote.quote}</p>
              <button className="btn btn my-2 my-sm-0 quote-button">
                -{quote.author}
              </button>
              <div className="userAdded">{quote.userId === loggedInUserId && "👌"}</div>
                {/* <div className="reactionss">
                  <div>like</div>
                  <div>dislike</div>
                </div> */}
            </div>
          ))}
          </div>


        </div>
        
      </div>
    </div>
  );
}

export default Quotes;
