import './Quotes.css';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faUserPlus,
  faPenToSquare,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";

const QuoteComponent = ({
  quote,
  userId,
  loggedInUserId,
  likeQuote,
  dislikeQuote,
  getLikedUsers,
  getDislikedUsers,
  getAllLikedUsers,
  getAllDislikedUsers,
  activeTab,
  deleteQuote,
  editQuote,
  loggedId,
pageRoute
}) => {
  return (
    <blockquote>
      <div className="mainContainer">
        <div className="quoteContainer">
          {quote.quote}
          <div className="QuoteReactions">
            <span>
              <button
                onClick={
                  quote.userId === userId
                    ? () => getLikedUsers(quote.id)
                    : () => likeQuote(quote.id)
                }
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ color: "#6ca32e" }}
                />
              </button>
              <button
                onClick={() => getAllLikedUsers(quote)}
                style={{ marginRight: "25px" }}
              >
                {" "}
                {quote.like}
              </button>
            </span>

            <span>
              <button
                onClick={
                  quote.userId === userId
                    ? () => getDislikedUsers(quote.id)
                    : () => dislikeQuote(quote.id)
                }
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{ color: "#6ca32e" }}
                />
              </button>
              <button
                onClick={() => getAllDislikedUsers(quote)}
                style={{ marginRight: "25px" }}
              >
                {" "}
                {quote.dislikes}
              </button>
            </span>

            <span>tags: {quote.tag}</span>
          </div>
        </div>
        <div className="authorNameContainer">-{quote.author}</div>
        <div className="userAdded" style={{ color: "#674ea7" }}>
            <button style={{ color: "#674ea7" }}>
              {quote.userId === loggedId && (
                <FontAwesomeIcon icon={faUserPlus} />
            )}
            </button>
          <button style={{ color: "#674ea7", cursor: "pointer" }}>
            {quote.userId === loggedInUserId && (
              <FontAwesomeIcon
                icon={activeTab === "Added Quotes" ? faPenToSquare : faUserPlus}
                onClick={editQuote}
              />
            )}
          </button>

          <button
            style={{ color: "#674ea7", cursor: "pointer" }}
            onClick={deleteQuote}
          >
            {quote.userId === loggedInUserId && (
              <FontAwesomeIcon
                icon={activeTab === "Added Quotes" ? faTrashCan : null}
              />
            )}
          </button>
        </div>
      </div>
    </blockquote>
  );
};

export default QuoteComponent;
