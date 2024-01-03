import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyQuotes.css";
import QuoteItem from "./QuoteItem";
import Swal from "sweetalert2";

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
      <input id="swal-input1" class="swal2-input" placeholder="${quote.quote}" value="${quote.quote}">
      <input id="swal-input2" class="swal2-input" placeholder="${quote.author}" value="${quote.author}">
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
        console.log("first");
        // console.log("editedQuote = ",editedQuote)
        // console.log("editedAuthor = ",editedAuthor)
      }
    }
  };

  useEffect(() => {
    // console.log("editMode = ", editMode)
    // console.log("editQuote = ", editQuote)
  }, [editMode, editQuote]);

  const saveEditedQuote = async (quoteId, editedQuote, editedAuthor) => {
    try {
      console.log("quote.id--->", quoteId);
      console.log("editedQuote = ", editedQuote);
      console.log("editedAuthor = ", editedAuthor);

      const baseURL = import.meta.env.VITE_API_URL;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        `${baseURL}/quotes/${quoteId}`,
        { quote: editedQuote, author: editedAuthor },
        { headers }
      );

      console.log("response.data = ", response.data);

      // Handle the response and update the UI if needed

      setEditMode(false);
      setEditQuote({ quote: "", author: "" });
      await fetchQuotes();
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  };

  // const loggedInUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchQuotes();
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getLikedUsers = async (quoteId) => {
    if (token && userId) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/quotes/${quoteId}/like/users`,
        { headers }
      );
      console.log("liked users = ", response.data.users);
      setLikeReactionUsers(response.data.users);

      const modalButton = document.querySelector(
        '[data-target="#exampleModalCenter"]'
      );

      if (modalButton) {
        modalButton.click();
      }
    }
    console.log(likeReactionUsers, "state");
  };

  const getDislikedUsers = async (quoteId) => {
    if (token && userId) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/quotes/${quoteId}/dislike/users`,
        { headers }
      );
      console.log("disliked users = ", response.data);
      setDislikeReactionUsers(response.data);

      const modalButton = document.querySelector(
        '[data-target="#exampleModalCenter"]'
      );
      if (modalButton) {
        modalButton.click();
      }
    }
  };

  const getAllLikedUsers = async (quote) => {
    if (quote.userId !== userId) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/quotes/${quote.id}/like/users`,
        { headers }
      );
      console.log("liked users = ", response.data.users);
      setLikeReactionUsers(response.data.users);

      const modalButton = document.querySelector(
        '[data-target="#exampleModalCenter2"]'
      );

      if (modalButton) {
        modalButton.click();
      }
    }
  };

  const getAllDislikedUsers = async (quote) => {
    if (quote.userId !== userId) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/quotes/${quote.id}/like/users`,
        { headers }
      );
      console.log("liked users = ", response.data.users);
      setDislikeReactionUsers(response.data.users);

      const modalButton = document.querySelector(
        '[data-target="#exampleModalCenter3"]'
      );

      if (modalButton) {
        modalButton.click();
      }
    }
  };

  const renderAddedQuotes = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;

      if (token && userId) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${baseURL}/quotes`, { headers });

        const addedQuotes = response.data.filter(
          (quote) => quote.userId === userId
        );

        setTotalAddedQuotesCount(addedQuotes.length);
        setUserAddedQuotes(addedQuotes);
        renderLikedQuotes();
        renderDislikedQuotes();
      } else {
        setTotalAddedQuotesCount(0);
        setUserAddedQuotes([]);
      }
    } catch (error) {
      console.error("Error fetching added quotes:", error);
      setTotalAddedQuotesCount(0);
      setUserAddedQuotes([]);
    }
  };

  const renderLikedQuotes = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;

      if (token && userId) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${baseURL}/users/${userId}/favourite-quotes`,
          { headers }
        );

        if (response.data && Array.isArray(response.data.quotes)) {
          setAllLikedQuotes(response.data.quotes);
          setTotalLikedQuotesCount(response.data.quotes.length);
        } else {
          console.error(
            "Liked quotes data might not be an array:",
            response.data
          );
          setTotalLikedQuotesCount(allLikedQuotes.length);
        }
      }
    } catch (error) {
      console.error("Error fetching liked quotes:", error);
      // setAllLikedQuotes([]);
    }
  };

  const renderDislikedQuotes = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;

      if (token && userId) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${baseURL}/users/${userId}/unfavourite-quotes`,
          { headers }
        );
        if (response.data && Array.isArray(response.data.quotes)) {
          setAlldislikedQuotes(response.data.quotes);
          setTotalDislikedQuotesCount(response.data.quotes.length);
        } else {
          console.error(
            "disliked quotes data might not be an array:",
            response.data
          );
          setTotalDislikedQuotesCount(alldislikedQuotes.length);
        }
      }
    } catch (error) {
      console.error("Error fetching disliked quotes:", error);
      // setAllLikedQuotes([]);
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

  // to delete a quote
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
        const baseURL = import.meta.env.VITE_API_URL;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.delete(`${baseURL}/quotes/${quoteId}`, {
          headers,
        });
        console.log(response.data);
        setUserAddedQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote.id !== quoteId)
        );
        setTotalAddedQuotesCount((prevCount) => prevCount - 1);
        console.log("deletion a quote ", quoteId);
      } catch (error) {
        throw error;
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your Quote has been deleted.",
        icon: "success",
      });
    }
  };

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
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
                getLikedUsers={getLikedUsers}
                getAllLikedUsers={getAllLikedUsers}
                getDislikedUsers={getDislikedUsers}
                getAllDislikedUsers={getAllDislikedUsers}
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
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
                getLikedUsers={getLikedUsers}
                getAllLikedUsers={getAllLikedUsers}
                getDislikedUsers={getDislikedUsers}
                getAllDislikedUsers={getAllDislikedUsers}
              />
            ))}

          {activeTab === "Disliked Quotes" &&
            alldislikedQuotes.map((quote, index) => (
              <QuoteItem
                key={index}
                quote={quote}
                userId={userId}
                loggedInUserId={userId}
                getLikedUsers={getLikedUsers}
                getAllLikedUsers={getAllLikedUsers}
                getDislikedUsers={getDislikedUsers}
                getAllDislikedUsers={getAllDislikedUsers}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyQuotes;
