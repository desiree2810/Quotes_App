import React, { useState, useEffect } from "react";
import "../css/Quotes.css"
import Navbar from "./Navbar";
import axios from "axios";

function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quotes");
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

  }, []);

  return (
    <>

    <div className="scrollable-page">
        {/* <Navbar/> */}
        <div className="title-div">Quotes</div>
        
        <div className="main-sub">
        <div className="main-container">
        {quotes.map((quote, index) => (
          
            <div className="quote-container"  key={index}>
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
