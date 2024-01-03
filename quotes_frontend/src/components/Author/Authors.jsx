import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Authors.css";
import authorService from "../../services/authorService";

function Authors({ isAuthenticated }) {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorService.authorsList();
        const arrayOfQuotes = response.data;

        if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
          const uniqueAuthorsSet = new Set(arrayOfQuotes.map((quote) => quote.author));
          const sortedAuthors = Array.from(uniqueAuthorsSet).sort((a, b) => a.localeCompare(b));

          setAuthors(sortedAuthors);
        } else {
          console.log("Empty array or invalid data format");
        }
      } catch (error) {
        console.log("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setFilteredAuthors([]); 
    } else {
      const filteredAuthors = authors.filter((author) =>
        author.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredAuthors(filteredAuthors);
    }
  };

  const handleAuthorClick = (author) => {
    navigate(`/quotes?author=${author}`);
  };

  return (
    <div className="scrollable-page">
      <div className="title-div">Authors</div>
      <div className="allAuthors">
        <div className="search-field">
          <input
            type="text"
            placeholder="Search authors"
            value={searchTerm}
            onChange={handleSearch}
          />

          {(searchTerm === "" || filteredAuthors.length === 0) && (
            <ul className="autocomplete-list">
              {authors.map((author, index) => (
                <li
                  key={index}
                  onClick={() => handleAuthorClick(author)}
                  className="clickable-author"
                >
                  {author}
                </li>
              ))}
            </ul>
          )}

          {filteredAuthors.length > 0 && (
            <ul className="autocomplete-list">
              {filteredAuthors.map((author, index) => (
                <li
                  key={index}
                  onClick={() => handleAuthorClick(author)}
                  className="clickable-author"
                >
                  {author}
                </li>
              ))}
            </ul>
          )}
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
    </div>
  );
}

export default Authors;



