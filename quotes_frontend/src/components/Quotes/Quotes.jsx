import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../shared/Quotes.css";
import QuoteItem from "../shared/QuoteItem";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import quoteService from "../../services/quoteService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUserId } from "../../utils/localstorageUtils";

function Quotes({ isAuthenticated }) {
  const [quotes, setQuotes] = useState([]);
  const [filterType, setFilterType] = useState("Author");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const loggedInUserId = getUserId()
  const [likeReactionUsers, setLikeReactionUsers] = useState([]);
  const [dislikeReactionUsers, setDislikeReactionUsers] = useState([]);
  const [allUserReactionsList, setAllUserReactionsList] = useState([]);
  const [likeQuoteCalled, setLikeQuoteCalled] = useState(false);
  const [dislikeQuoteCalled, setDislikeQuoteCalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [location.search]);

  const fetchQuotes = async () => {
    try {
      const searchParam = location.search;
      const response = await quoteService.getQuotes(searchParam);
      const arrayOfQuotes = response;

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
      if (searchTerm.trim() !== "") {

        let url = quoteService.getQuotes();
  
        if (filterType === "Author") {
          url += `?author=${searchTerm}`;
        } else if (filterType === "Quote") {
          url += `?quote=${searchTerm}`;
        } else if (filterType === "Tag") {
          url += `?tag=${searchTerm}`;
        }

        const response = await axios.get(url);
        navigate(`/quotes?${filterType.toLowerCase()}=${searchTerm}`);

        const arrayOfQuotes = response.data;
        if (Array.isArray(arrayOfQuotes) && arrayOfQuotes.length > 0) {
          setQuotes(arrayOfQuotes);
        } else {
          console.log(
            "No quotes found for the specified filter and search term"
          );
        }
      }
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setFilterType("Author");
    navigate("/quotes");
    fetchQuotes();
  };

  let token = getToken()
  let userId = getUserId()

  // to like a quote
  const likeQuote = async (quoteId) => {
    try {
      if (token && userId) {

          if (likeQuoteCalled) {
          const response = await quoteService.removeLikeFromQuote(quoteId, token);
          console.log("response = ", response);
        } else {
          const response = await quoteService.likeQuote(quoteId, token);
          console.log("response = ", response);
          if (response.status === 204){
            notifyResponseIncrement()
          }
        }

        // Toggle the state
        setLikeQuoteCalled(!likeQuoteCalled);
        
      }
    } catch (error) {
      console.error("Error liking quote:", error);
    }
  };

  // to dislike a quote
  const dislikeQuote = async (quoteId) => {
    try {
      if (token && userId) {
        if (dislikeQuoteCalled) {
          const response = await quoteService.removeDislikeFromQuote(quoteId, token);
          console.log("response = ", response);
        } else {
          const response = await quoteService.dislikeQuote(quoteId, token);
          console.log("response = ", response);
          if (response.status === 204){
            notifyResponseIncrement()
          }
        }
        // Toggle the state
        setDislikeQuoteCalled(!dislikeQuoteCalled);
      }
    } catch (error) {
      console.error("Error disliking quote:", error);
    }
  };

  const removeLikeFromQuote = async (quoteId) => {
    try {
      if (token && userId) {
        const response = await quoteService.removeLikeFromQuote(quoteId, token);
        console.log("response.data = ", response);
        if (response.status === 204){
          notifyResponseDecrement()
        }
        // Toggle the state
        setLikeQuoteCalled(!likeQuoteCalled);
      }
    } catch (error) {
      console.error("Error while remove like from quote:", error);
    }
  };

  const removeDislikeFromQuote = async (quoteId) => {
    try {
      if (token && userId) {
        const response = await quoteService.removeDislikeFromQuote(quoteId, token);
        console.log("response.data = ", response);
        if (response.status === 204){
          notifyResponseDecrement()
        }
        // Toggle the state
        setDislikeQuoteCalled(!dislikeQuoteCalled);
      }
    } catch (error) {
      console.error("Error while remove dislike from quote:", error);
    }
  };

  // get all users who liked the quotes
  const getLikedUsers = async (quoteId) => {
    try {
      if (token && userId) {
        const response = await quoteService.getLikedUsers(quoteId, token);
        setLikeReactionUsers([]);
        setLikeReactionUsers(response);
        getDislikedUsers(quoteId);

        const modalButton = document.querySelector(
          '[data-target="#exampleModalCenter"]'
        );

        if (modalButton) {
          modalButton.click();
          console.log(likeReactionUsers, "liked state");
          console.log(dislikeReactionUsers, "disliked state");
        }
      }
    } catch (error) {
      console.error("Error to get all users: ", error);
    }
  };

  // get all users who disliked the quotes
  const getDislikedUsers = async (quoteId) => {
    try {
      if (token && userId) {
        const response = await quoteService.getDislikedUsers(quoteId, token);
        setDislikeReactionUsers([]);
        setDislikeReactionUsers(response);

        const modalButton = document.querySelector(
          '[data-target="#exampleModalCenter"]'
        );

        if (modalButton) {
          modalButton.click();
          console.log(likeReactionUsers, "liked state");
          console.log(dislikeReactionUsers, "disliked state");
        }
      }
    } catch (error) {
      console.error("Error to get all users: ", error);
    }
  };

  // get all users who liked the quote that is not added by the logged in user
  const getAllLikedUsers = async (quote) => {
    try {
      if (quote.userId !== userId) {
        const response = await quoteService.getAllLikedUsersList(quote, token);
        setAllUserReactionsList(response);

        const modalButton = document.querySelector(
          '[data-target="#exampleModalCenter2"]'
        );

        if (modalButton) {
          modalButton.click();
        }
      }
    } catch (error) {
      console.log("Error while getting the user list:", error);
    }
  };

  const getAllDislikedUsers = async (quote) => {
    try {
      if (quote.userId !== userId) {
        const response = await quoteService.getAllDislikedUsersList(
          quote,
          token
        );
        setAllUserReactionsList(response);

        const modalButton = document.querySelector(
          '[data-target="#exampleModalCenter3"]'
        );

        if (modalButton) {
          modalButton.click();
        }
      }
    } catch (error) {
      console.log("Error while getting the user list:", error);
    }
  };

  const notifyResponseIncrement = () => toast.success(<>
  <div>Your response is recorded</div>
  <div>Same will get reflected in 30 seconds</div>
  </>);

const notifyResponseDecrement = () => toast.error(<>
  <div>Your response is recorded</div>
  <div>Same will get reflected in 30 seconds</div>
  </>);

  return (
    <div className="scrollable-page1">
      <div className="title-div">Quotes</div>
      <div className="main-sub1">
        <div className="auth-container ">
          <div className="filter-div first-div">
            <select
              className="form-control mr-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Author">Author</option>
              <option value="Quote">Quote</option>
              <option value="Tag">Tag</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              className="form-control mr-2"
              placeholder={`Enter ${filterType.toLowerCase()}'s name`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="btn mr-2 searchbtn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button className="btn refbtn" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
          {isAuthenticated && (
            <div>
              <Link to="/addquote" className="btn btn my-2 my-sm-0 addQuoteBtn">
                Add Quote ➕
              </Link>
            </div>
          )}
        </div>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          type="error"
          theme="light"
          />

        {quotes.length > 0 ? (
          quotes.map((quote, index) => (
            <QuoteItem
              key={index}
              quote={quote}
              userId={userId}
              loggedInUserId={loggedInUserId}
              likeQuote={likeQuote}
              dislikeQuote={dislikeQuote}
              getLikedUsers={getLikedUsers}
              getDislikedUsers={getDislikedUsers}
              getAllLikedUsers={getAllLikedUsers}
              getAllDislikedUsers={getAllDislikedUsers}
              removeLikeFromQuote={removeLikeFromQuote}
              removeDislikeFromQuote={removeDislikeFromQuote}
              likeQuoteCalled={likeQuoteCalled}
              dislikeQuoteCalled={dislikeQuoteCalled}
            />
          ))
        ) : (
          <div className="scrollable-page1 d-flex align-items-center justify-content-center p-5">
          <div className="main-sub1">
            <h4>No quotes found to display</h4>
          </div>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          style={{ visibility: "hidden" }}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  People who reacted
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-like-tab"
                      data-toggle="tab"
                      data-target="#nav-like"
                      type="button"
                      role="tab"
                      aria-controls="nav-like"
                      aria-selected="true"
                    >
                      Liked 👍
                    </button>
                    <button
                      className="nav-link"
                      id="nav-dislike-tab"
                      data-toggle="tab"
                      data-target="#nav-dislike"
                      type="button"
                      role="tab"
                      aria-controls="nav-dislike"
                      aria-selected="false"
                    >
                      Disliked 👎
                    </button>
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-like"
                    role="tabpanel"
                    aria-labelledby="nav-like-tab"
                    style={{ overflowY: "scroll" }}
                  >
                    {Array.isArray(likeReactionUsers) &&
                    likeReactionUsers.length > 0 ? (
                      likeReactionUsers.map((user, index) => (
                        <ul key={index}>
                          <li>
                            {user.first_name} {user.last_name}
                          </li>
                        </ul>
                      ))
                    ) : (
                      <div>
                        <h5>No one liked this quote</h5>
                      </div>
                    )}
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-dislike"
                    role="tabpanel"
                    aria-labelledby="nav-dislike-tab"
                    style={{ overflowY: "scroll" }}
                  >
                    {Array.isArray(dislikeReactionUsers) &&
                    dislikeReactionUsers.length > 0 ? (
                      dislikeReactionUsers.map((user, index) => (
                        <ul key={index}>
                          <li>
                            {user.first_name} {user.last_name}
                          </li>
                        </ul>
                      ))
                    ) : (
                      <div>
                        <h5>No one disliked this quote</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter2"
          style={{ visibility: "hidden" }}
        >
          Launch demo modal2
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  People who reacted
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: "#6ca32e", marginLeft: "0.5rem" }}
                  />
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-like"
                    role="tabpanel"
                    aria-labelledby="nav-like-tab"
                    style={{ overflowY: "scroll" }}
                  >
                    {Array.isArray(allUserReactionsList) &&
                    allUserReactionsList.length > 0 ? (
                      allUserReactionsList.map((user, index) => (
                        <ul>
                          <li key={index}>
                            {user.first_name} {user.last_name}
                          </li>
                        </ul>
                      ))
                    ) : (
                      <div>
                        <h5>No one liked this quote</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter3"
          style={{ visibility: "hidden" }}
        >
          Launch demo modal3
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter3"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  People who reacted
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    style={{ color: "#6ca32e", marginLeft: "0.5rem" }}
                  />
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-dislike"
                    role="tabpanel"
                    aria-labelledby="nav-dislike-tab"
                    style={{ overflowY: "scroll" }}
                  >
                    {Array.isArray(allUserReactionsList) &&
                    allUserReactionsList.length >= 0 ? (
                      allUserReactionsList.map((user, index) => (
                        <ul>
                          <li key={index}>
                            {user.first_name} {user.last_name}
                          </li>
                        </ul>
                      ))
                    ) : (
                      <div>
                        <h5>No one disliked this quote</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotes;
