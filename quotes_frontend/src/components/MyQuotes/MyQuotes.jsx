import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyQuotes.css";
import Swal from "sweetalert2";
import quoteService from "../../services/quoteService";
import QuoteItem from "../shared/QuoteItem";
import "../shared/Quotes.css";
import EmptyQuote from "./EmptyQuote";
import { getToken, getUserId } from "../../utils/localstorageUtils";
import { useNavigate } from "react-router-dom";

const MyQuotes = () => {
  const [activeTab, setActiveTab] = useState("Added Quotes");
  const [quotes, setQuotes] = useState([]);
  const [allLikedQuotes, setAllLikedQuotes] = useState([]);
  const [alldislikedQuotes, setAlldislikedQuotes] = useState([]);
  const [userAddedQuotes, setUserAddedQuotes] = useState([]);
  const [totalAddedQuotesCount, setTotalAddedQuotesCount] = useState(0);
  const [totalLikedQuotesCount, setTotalLikedQuotesCount] = useState(0);
  const [totalDislikedQuotesCount, setTotalDislikedQuotesCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editQuote, setEditQuote] = useState({ quote: "", author: "" });
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState({ quote: "", author: "" });

  const handleEditClick = (quote) => {
    // Set the selected quote and show the edit form
    setSelectedQuote(quote);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    // Reset the selected quote and hide the edit form
    setSelectedQuote({ quote: "", author: "" });
    setShowEditForm(false);
  };

  const saveEditedQuote = async (quoteId, editedQuote, editedAuthor) => {
    try {
      const response = await quoteService.saveEditedQuote(
        quoteId,
        editedQuote,
        editedAuthor,
        token
      );
      console.log("response.data = ", response);

      setEditMode(false);
      setEditQuote({ quote: "", author: "" });
      await fetchQuotes();
    } catch (error) {
      console.error("Error during quote update:", error);
    }
  };

  const token = getToken();
  const userId = getUserId();

  useEffect(() => {
    fetchQuotes();
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderAddedQuotes = async () => {
    try {
      if (token && userId) {
        try {
          const addedQuotes = await quoteService.getAddedQuotes(userId, token);

          setTotalAddedQuotesCount(addedQuotes.length);
          setUserAddedQuotes(addedQuotes);
          renderLikedQuotes();
          renderDislikedQuotes();
        } catch (error) {
          console.error("Error fetching added quotes:", error);
          setTotalAddedQuotesCount(0);
          setUserAddedQuotes([]);
        }
      } else {
        setTotalAddedQuotesCount(0);
        setUserAddedQuotes([]);
      }
    } catch (error) {
      console.error("Error during added quotes retrieval:", error);
      setTotalAddedQuotesCount(0);
      setUserAddedQuotes([]);
    }
  };

  const renderLikedQuotes = async () => {
    try {
      if (token && userId) {
        try {
          const likedQuotes = await quoteService.getLikedQuotes(userId, token);

          setAllLikedQuotes(likedQuotes);
          setTotalLikedQuotesCount(likedQuotes.length);
        } catch (error) {
          console.error("Error fetching liked quotes:", error);
        }
      }
    } catch (error) {
      console.error("Error during liked quotes retrieval:", error);
    }
  };

  const renderDislikedQuotes = async () => {
    try {
      if (token && userId) {
        try {
          const dislikedQuotes = await quoteService.getDislikedQuotes(
            userId,
            token
          );

          setAlldislikedQuotes(dislikedQuotes);
          setTotalDislikedQuotesCount(dislikedQuotes.length);
        } catch (error) {
          console.error("Error fetching disliked quotes:", error);
        }
      }
    } catch (error) {
      console.error("Error during disliked quotes retrieval:", error);
    }
  };

  const fetchQuotes = async () => {
    try {
      let url;

      if (activeTab === "Added Quotes") {
        renderAddedQuotes();
      } else if (activeTab === "Liked Quotes") {
        renderLikedQuotes();
      } else if (activeTab === "Disliked Quotes") {
        renderDislikedQuotes();
      }

      const response = await axios.get(url);
      setQuotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  const deleteQuote = async (quoteId) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: "custom-swal-container",
        popup: "custom-swal-popup",
      },
    }).then((result) => {
      return result.isConfirmed;
    });

    if (isConfirmed) {
      try {
        const response = await quoteService.deleteQuote(quoteId, token);
        console.log(response);

        setUserAddedQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote.id !== quoteId)
        );

        setTotalAddedQuotesCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.error("Error deleting quote:", error);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your Quote has been deleted.",
        icon: "success",
      });
    }
  };

  const itemName = "quotes";
  const handleSaveEditedQuote = async () => {
    try {
      const response = await quoteService.saveEditedQuote(
        selectedQuote.id,
        selectedQuote.quote,
        selectedQuote.author,
        token
      );
      console.log("response.data = ", response);

      handleEditFormClose();

      await fetchQuotes();
    } catch (error) {
      console.error("Error during quote update:", error);
    }
  };

  return (
    <div className="outer-div">
      My Quotes
      <div className="main-div">
        {showEditForm && <div className="overlay"></div>}
        <div className="navbar-div">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "Added Quotes" && "active-tab"
                }`}
                onClick={() => handleTabClick("Added Quotes")}
                href="#"
              >
                Added Quotes
                <span className="badge badge-secondary ml-1">
                  {totalAddedQuotesCount}
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "Liked Quotes" && "active-tab"
                }`}
                onClick={() => handleTabClick("Liked Quotes")}
                href="#"
              >
                Liked Quotes
                <span className="badge badge-secondary ml-1">
                  {totalLikedQuotesCount}
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "Disliked Quotes" && "active-tab"
                }`}
                onClick={() => handleTabClick("Disliked Quotes")}
                href="#"
              >
                Disliked Quotes
                <span className="badge badge-secondary ml-1">
                  {totalDislikedQuotesCount}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="quotes-display">
          {activeTab === "Added Quotes" && userAddedQuotes.length > 0 ? (
            userAddedQuotes.map((quote, index) => (
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
                activeTab={activeTab}
                deleteQuote={() => deleteQuote(quote.id)}
                editQuote={() => handleEditClick(quote)}
                editMode={editMode}
                setEditQuote={setEditQuote}
                totalLikedQuotesCount={totalLikedQuotesCount}
                totalDislikedQuotesCount={totalDislikedQuotesCount}
              />
            ))
          ) : activeTab === "Liked Quotes" && allLikedQuotes.length > 0 ? (
            allLikedQuotes.map((quote, index) => (
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
              />
            ))
          ) : activeTab === "Disliked Quotes" &&
            alldislikedQuotes.length > 0 ? (
            alldislikedQuotes.map((quote, index) => (
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
              />
            ))
          ) : (
            <EmptyQuote itemName={itemName} />
          )}
          {showEditForm && (
            <div className="edit-form-container">
              <h2>Edit Quote</h2>
              <textarea
                value={selectedQuote.quote}
                onChange={(e) =>
                  setSelectedQuote({ ...selectedQuote, quote: e.target.value })
                }
                rows="4"
              />
              <input
                type="text"
                value={selectedQuote.author}
                onChange={(e) =>
                  setSelectedQuote({ ...selectedQuote, author: e.target.value })
                }
              />
              <div className="btn-container">
                <button className="save-button" onClick={handleSaveEditedQuote}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleEditFormClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyQuotes;
