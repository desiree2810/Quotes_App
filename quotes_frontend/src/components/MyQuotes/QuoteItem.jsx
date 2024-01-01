import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const QuoteItem = ({ quote, userId, loggedInUserId, getLikedUsers, getAllLikedUsers, dislikeQuote, getDislikedUsers, getAllDislikedUsers }) => (
  <blockquote>
    <div className="mainContainer">
      <div className="quoteContainer">
        {quote.quote}
        <div className="QuoteReactions">
          <span>
            <button
              onClick={quote.userId === userId ? () => getLikedUsers(quote.id) : () => likeQuote(quote.id)}
            >
              <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#6ca32e" }} />
            </button>
            <button onClick={() => getAllLikedUsers(quote)}> {quote.like}</button>
          </span>

          <span>
            <button
              onClick={quote.userId === userId ? () => getDislikedUsers(quote.id) : () => dislikeQuote(quote.id)}
            >
              <FontAwesomeIcon icon={faThumbsDown} style={{ color: "#6ca32e" }} />
            </button>
            <button onClick={() => getAllDislikedUsers(quote)}> {quote.dislikes}</button>
          </span>
        </div>
      </div>
      <div className="authorNameContainer">-{quote.author}</div>
      <div className="userAdded" style={{ color: "#674ea7" }}>
        {quote.userId === loggedInUserId && <FontAwesomeIcon icon={faUserPlus} />}
      </div>
    </div>
  </blockquote>
);

export default QuoteItem;
