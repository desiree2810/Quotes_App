

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp,faThumbsDown,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import EditIcon from "@mui/icons-material/Edit";

const QuoteItem = ({
  quote,
  userId,
  loggedInUserId,
  getLikedUsers,
  getAllLikedUsers,
  dislikeQuote,
  getDislikedUsers,
  getAllDislikedUsers,
  EditQuote,
  saveChangesToDatabase,
  deleteQuote,
  activeTab
}) => {
  const [editedQuote, setEditedQuote] = useState(quote.quote);
  const [editedAuthor, setEditedAuthor] = useState(quote.author);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "quote") {
      setEditedQuote(value);
    } else if (field === "author") {
      setEditedAuthor(value);
    }
  };

  return (
    <>
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
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: "#6ca32e" }}
                  />
                </button>
                <button onClick={() => getAllLikedUsers(quote)}>
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
                >
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    style={{ color: "#6ca32e" }}
                  />
                </button>
                <button onClick={() => getAllDislikedUsers(quote)}>
                  {" "}
                  {quote.dislikes}
                </button>
              </span>
            </div>
          </div>
          <div className="authorNameContainer">-{quote.author}</div>
          <div className="userAdded" style={{ color: "#674ea7" }} onClick={() => EditQuote(quote.id)}>
            {quote.userId === loggedInUserId && (
              <EditIcon data-toggle="modal" data-target="#exampleModalEdit" />
              
            )}
          <button style={{ color: "#674ea7", paddingLeft:"1rem" }} onClick={deleteQuote}>
          {quote.userId === loggedInUserId && <FontAwesomeIcon icon={activeTab === "Added Quotes" ? faTrashCan : null} />}
          </button>
          </div>
          

          {/* <button style={{ color: "#674ea7" }} onClick={deleteQuote}>
          {quote.userId === loggedInUserId && <FontAwesomeIcon icon={activeTab === "Added Quotes" ? faTrashCan : null} />}
        </button> */}
        </div>
      </blockquote>

      {/* Edit Modal */}
      <div class="modal" tabindex="-1" role="dialog" id="exampleModalEdit">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style={{ fontSize: "15px" }}>
                Edit Quote
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="quote-div">
                <p style={{ fontSize: "15px" }}>Quote</p>
                <input
                  type="text"
                  name="quote"
                  value={editedQuote}
                  onChange={(e) => handleInputChange(e, "quote")}
                />
              </div>
              <div className="author-div">
                <p style={{ fontSize: "15px", marginTop: "4px" }}>Author</p>
                <input
                  type="text"
                  name="author"
                  value={editedAuthor}
                  onChange={(e) => handleInputChange(e, "author")}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                style={{ marginRight: "10px", fontSize: "15px", width: "150px" }}
                onClick={() => {
                  saveChangesToDatabase(quote.id, editedQuote, editedAuthor);
                }}
              >
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                style={{ fontSize: "15px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteItem;

