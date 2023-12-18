import React, { useState, useEffect } from "react";
import "../css/Quotes.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const author = searchParams.get("author");

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        let url = `${baseURL}/quotes`;

        if (author) {
          // If author is present in the URL, modify the URL to fetch quotes by that author
          url += `?author=${author}`;
        }

        const response = await axios.get(url);
        const arrayOfQuotes = response.data;

        if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
          setQuotes(arrayOfQuotes);
          console.log(arrayOfQuotes);
        } else {
          console.log("Empty array or invalid data format");
        }
      } catch (error) {
        console.log("Error fetching quotes:", error);
      }
    };

    fetchQuotes();

  }, [author, location.search]);

  return (
    <>
      <div className="scrollable-page">
        <div className="title-div">Quotes</div>
        <div className="main-sub">
          <div className="main-container">
            {quotes.map((quote, index) => (
              <div className="quote-container" key={index}>
                <p className="quote-message">{quote.quote}</p>
                <button className="quote-button">-{quote.author}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quotes;
