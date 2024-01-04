import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyQuotes.css";
import Swal from "sweetalert2";
import quoteService from "../../services/quoteService";
import QuoteComponent from "../Quotes/QuoteComponent";
import "../Quotes/Quotes.css";

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

  const handleEditClick = async (quote) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Quote",
      html: `
      <textarea id="swal-input1" class="swal1-input" placeholder="${quote.quote}" rows="4" >${quote.quote}</textarea>
      <input id="swal-input2" class="swal2-input" placeholder="${quote.author}" value="${quote.author}" />
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    });

    if (formValues) {
      const editedQuote = document.getElementById("swal-input1").value;
      const editedAuthor = document.getElementById("swal-input2").value;

      if (editedQuote && editedAuthor) {
        setEditQuote({ quote: editedQuote, author: editedAuthor });
        setEditMode(true);
        saveEditedQuote(quote.id, editedQuote, editedAuthor);
        console.log("editedQuote = ", editedQuote);
        console.log("editedAuthor = ", editedAuthor);
      }
    }
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

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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
          // setAllLikedQuotes([]);
        }
      }
    } catch (error) {
      console.error("Error during liked quotes retrieval:", error);
      // setAllLikedQuotes([]);
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
          // setAlldislikedQuotes([]);
        }
      }
    } catch (error) {
      console.error("Error during disliked quotes retrieval:", error);
      // setAlldislikedQuotes([]);
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

  // const pageRoute = "2";

  return (
    <div className="outer-div">
      My Quotes
      <div className="main-div">
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
                {/* {activeTab === "Added Quotes" && ( */}
                <span className="badge badge-secondary ml-1">
                  {totalAddedQuotesCount}
                </span>
                {/* )} */}
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
                {/* {activeTab === "Liked Quotes" && ( */}
                <span className="badge badge-secondary ml-1">
                  {totalLikedQuotesCount}
                </span>
                {/* )} */}
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
                {/* {activeTab === "Disliked Quotes" && ( */}
                <span className="badge badge-secondary ml-1">
                  {totalDislikedQuotesCount}
                </span>
                {/* )} */}
              </a>
            </li>
          </ul>
        </div>
        <div className="quotes-display">
          {activeTab === "Added Quotes" &&
            userAddedQuotes.map((quote, index) => (
              <QuoteComponent
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
                // getLikedUsers={getLikedUsers}
                // getAllLikedUsers={getAllLikedUsers}
                // getDislikedUsers={getDislikedUsers}
                // getAllDislikedUsers={getAllDislikedUsers}
                activeTab={activeTab}
                deleteQuote={() => deleteQuote(quote.id)}
                editQuote={() => handleEditClick(quote)}
                editMode={editMode}
                setEditQuote={setEditQuote}
                totalLikedQuotesCount={totalLikedQuotesCount}
                totalDislikedQuotesCount={totalDislikedQuotesCount}
              />
            ))}

          {activeTab === "Liked Quotes" &&
            allLikedQuotes.map((quote, index) => (
              <QuoteComponent
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
              />
            ))}

          {activeTab === "Disliked Quotes" &&
            alldislikedQuotes.map((quote, index) => (
              <QuoteComponent
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyQuotes;
