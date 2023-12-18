import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Authors.css";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorQuotes, setAuthorQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/authors");
        const arrayOfAuthors = response.data;

        if (Array.isArray(arrayOfAuthors) && arrayOfAuthors.length > 0) {
          const sortedAuthors = arrayOfAuthors.sort((a, b) =>
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/quotes?author=${searchTerm}`
      );
      const quotesByAuthor = response.data;

      if (Array.isArray(quotesByAuthor) && quotesByAuthor.length > 0) {
        setAuthorQuotes(quotesByAuthor);
        console.log(quotesByAuthor);
      } else {
        console.log("No quotes found for the specified author");
      }
    } catch (error) {
      console.log("Error fetching quotes by author:", error);
    }
  };

  return (
    <>
      <div className="scrollable-page">
        {/* <Navbar/> */}
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
                    <p key={index}>
                      {quote.author === searchTerm && <p>{quote.quote}</p>}
                    </p>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="main-sub">
          <div className="main-container">
            {authors.map((author, index) => (
              <div className="quote-container" key={index}>
                <p className="quote-message">{author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Authors;
