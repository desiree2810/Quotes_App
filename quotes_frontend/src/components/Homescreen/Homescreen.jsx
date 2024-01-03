import React, { useEffect, useState } from "react";
import "./Homescreen.css";

function Homescreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [remainingQuotes, setRemainingQuotes] = useState([]);
  const [initialQuoteDisplayed, setInitialQuoteDisplayed] = useState(false);

  useEffect(() => {
    const likedQuotes = JSON.parse(localStorage.getItem("likedQuotes")) || [];
    const addedQuotes = JSON.parse(localStorage.getItem("addedQuotes")) || [];
    const existingQuotes = JSON.parse(localStorage.getItem("existingQuotes")) || [];
    const dislikedQuotes = JSON.parse(localStorage.getItem("dislikedQuotes")) || [];

    const combinedQuotes = [...likedQuotes, ...addedQuotes, ...existingQuotes, ...dislikedQuotes];
    setRemainingQuotes(combinedQuotes);

    if (combinedQuotes.length > 0) {
      const firstQuote = combinedQuotes[0];
      setQuote(firstQuote.quote);
      setAuthor(firstQuote.author);
      setRemainingQuotes((prevQuotes) => prevQuotes.slice(1));
      setInitialQuoteDisplayed(true);
    } else {
      setQuote("No more quotes available");
      setAuthor("");
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (initialQuoteDisplayed) {
      intervalId = setInterval(() => {
        if (remainingQuotes.length > 0) {
          const firstQuote = remainingQuotes[0];
          setQuote(firstQuote.quote);
          setAuthor(firstQuote.author);
          setRemainingQuotes((prevQuotes) => prevQuotes.slice(1));
        } else {
          setQuote("No more quotes available");
          setAuthor("");
        }
      }, 90000); // 10 seconds interval (86400000 = 24 hr)
    }

    return () => clearInterval(intervalId);
  }, [initialQuoteDisplayed, remainingQuotes]);

  return (
    <div className="HomescreenContainer">
      <div className="centerContent">
        <p>{quote}</p>
        <div className="authorContent"> - {author}</div>
      </div>
    </div>
  );
}

export default Homescreen;
