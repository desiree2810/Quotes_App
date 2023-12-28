import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Authors.css";

function Authors({isAuthenticated}) {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const navigate = useNavigate(); 

  const baseURL = import.meta.env.VITE_API_URL;

  // console.log("start------")

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`${baseURL}/quotes`);
        const arrayOfQuotes = response.data;

        if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
          const uniqueAuthorsSet = new Set(
            arrayOfQuotes.map((quote) => quote.author)
          );
          const sortedAuthors = Array.from(uniqueAuthorsSet).sort((a, b) =>
            a.localeCompare(b)
          );

          setAuthors(sortedAuthors);
          console.log(sortedAuthors);
        } else {
          console.log("Empty array or invalid data format");
        }
      } catch (error) {
        console.log("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${baseURL}/quotes`);
      const quotesByAuthor = response.data;
      if (Array.isArray(quotesByAuthor) && quotesByAuthor.length > 0) {
        setAuthorQuotes(quotesByAuthor);
        console.log(quotesByAuthor);

        // Navigate to the quotes page with the author parameter
        navigate(`/quotes?author=${searchTerm}`);
      } else {
        console.log("No quotes found for the specified author");
      }
    } catch (error) {
      console.log("Error fetching quotes by author:", error);
    }
  };
  // const userId = localStorage.getItem("userId")
  // const token = localStorage.getItem("token")
  // if (userId && token){
  //   isAuthenticated
  // }





  return (
    <>
    {
      // isAuthenticated &&
      <div className="scrollable-page">
      <div className="title-div">Authors</div>
      <div className="allAuthors">
        <div className="search-field">
          <input
            type="text"
            placeholder="Enter author's name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button id="searchAuthor" onClick={handleSearch}>
            Search
          </button>
        </div>

        {authorQuotes.length > 0 && (
          <div>
            <h2>Quotes by {searchTerm}</h2>
            <div className="quotesforauthor">
              <ul>
                {authorQuotes.map((quote, index) => (
                  <p key={index}>{quote.quote}</p>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="main-sub">
        <div className="main-container">
          {authors.map((author, index) => (
            <div
              className="quote-container"
              key={index}
              onClick={() => navigate(`/quotes?author=${author}`)}
            >
              <p className="quote-message">{author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    }

    </>
  );
}

export default Authors;

