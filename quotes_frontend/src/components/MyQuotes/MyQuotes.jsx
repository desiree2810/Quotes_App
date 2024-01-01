// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./MyQuotes.css";
// import QuoteItem from "./QuoteItem";

// const MyQuotes = () => {
//   const [activeTab, setActiveTab] = useState("Added Quotes");
//   const [quotes, setQuotes] = useState([]);
//   const [allLikedQuotes, setAllLikedQuotes] = useState([]);
//   const [userAddedQuotes, setUserAddedQuotes] = useState([]);
//   const [totalAddedQuotesCount, setTotalAddedQuotesCount] = useState(0);
//   const [alldislikedQuotes, setAlldislikedQuotes] = useState([]);
//   const loggedInUserId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     fetchQuotes();
//   }, [activeTab]);

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   const getLikedUsers = async (quoteId) => {
//     if (token && userId) {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `${baseURL}/quotes/${quoteId}/like/users`,
//         { headers }
//       );
//       console.log("liked users = ", response.data.users);
//       setLikeReactionUsers(response.data.users);

//       const modalButton = document.querySelector(
//         '[data-target="#exampleModalCenter"]'
//       );

//       if (modalButton) {
//         modalButton.click();
//       }
//     }
//     console.log(likeReactionUsers, "state");
//   };

//   const getDislikedUsers = async (quoteId) => {
//     if (token && userId) {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `${baseURL}/quotes/${quoteId}/dislike/users`,
//         { headers }
//       );
//       console.log("disliked users = ", response.data);
//       setDislikeReactionUsers(response.data);

//       const modalButton = document.querySelector(
//         '[data-target="#exampleModalCenter"]'
//       );
//       if (modalButton) {
//         modalButton.click();
//       }
//     }
//   };

//   const getAllLikedUsers = async (quote) => {
//     if (quote.userId !== userId) {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `${baseURL}/quotes/${quote.id}/like/users`,
//         { headers }
//       );
//       console.log("liked users = ", response.data.users);
//       setLikeReactionUsers(response.data.users);

//       const modalButton = document.querySelector(
//         '[data-target="#exampleModalCenter2"]'
//       );

//       if (modalButton) {
//         modalButton.click();
//       }
//     }
//   };

//   const getAllDislikedUsers = async (quote) => {
//     if (quote.userId !== userId) {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `${baseURL}/quotes/${quote.id}/like/users`,
//         { headers }
//       );
//       console.log("liked users = ", response.data.users);
//       setDislikeReactionUsers(response.data.users);

//       const modalButton = document.querySelector(
//         '[data-target="#exampleModalCenter3"]'
//       );

//       if (modalButton) {
//         modalButton.click();
//       }
//     }
//   };

//   const renderAddedQuotes = async () => {
//     try {
//       const baseURL = import.meta.env.VITE_API_URL;

//       if (token && userId) {
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         };

//         const response = await axios.get(`${baseURL}/quotes`, { headers });

//         const addedQuotes = response.data.filter(
//           (quote) => quote.userId === userId
//         );

//         setTotalAddedQuotesCount(addedQuotes.length);
//         setUserAddedQuotes(addedQuotes);
//       } else {
//         setTotalAddedQuotesCount(0);
//         setUserAddedQuotes([]);
//       }
//     } catch (error) {
//       console.error("Error fetching added quotes:", error);
//       setTotalAddedQuotesCount(0);
//       setUserAddedQuotes([]);
//     }
//   };

//   const renderLikedQuotes = async () => {
//     try {
//       const baseURL = import.meta.env.VITE_API_URL;

//       if (token && userId) {
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         };

//         const response = await axios.get(
//           `${baseURL}/users/${userId}/favourite-quotes`,
//           { headers }
//         );

//         if (response.data && Array.isArray(response.data.quotes)) {
//           setAllLikedQuotes(response.data.quotes);
//         } else {
//           console.error("Liked quotes data might not be an array:", response.data);

//         }
//       }
//     } catch (error) {
//       console.error("Error fetching liked quotes:", error);
//     }
//   };

//   const renderDislikedQuotes = async () => {
//     try {
//       const baseURL = import.meta.env.VITE_API_URL;

//       if (token && userId) {
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         };

//         const response = await axios.get(
//           `${baseURL}/users/${userId}/unfavourite-quotes`,
//           { headers }
//         );
//         if (response.data && Array.isArray(response.data.quotes)) {
//           setAlldislikedQuotes(response.data.quotes);
//         } else {
//           console.error("disliked quotes data might not be an array:", response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching disliked quotes:", error);
//     }
//   };

//   const fetchQuotes = async () => {
//     try {
//       let url;

//       if (activeTab === "Added Quotes") {
//         renderAddedQuotes();
//       }  else if (activeTab === "Liked Quotes") {
//         renderLikedQuotes();
//       } else if (activeTab === "Disliked Quotes") {
//         renderDislikedQuotes();
//       }

//       const response = await axios.get(url);
//       setQuotes(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log("Error fetching quotes:", error);
//     }
//   };

//   return (
//     <div className="outer-div">
//       My Quotes
//       <div className="main-div">
//         <div className="navbar-div">
//           <ul className="nav nav-pills nav-fill">
//             <li className="nav-item">
//               <a
//                 className={`nav-link ${
//                   activeTab === "Added Quotes" && "active-tab"
//                 }`}
//                 onClick={() => handleTabClick("Added Quotes")}
//                 href="#"
//               >
//                 Added Quotes
//                 {activeTab === "Added Quotes" && (
//                   <span className="badge badge-secondary ml-1">
//                     {totalAddedQuotesCount}
//                   </span>
//                 )}
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className={`nav-link ${
//                   activeTab === "Liked Quotes" && "active-tab"
//                 }`}
//                 onClick={() => handleTabClick("Liked Quotes")}
//                 href="#"
//               >
//                 Liked Quotes
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className={`nav-link ${
//                   activeTab === "Disliked Quotes" && "active-tab"
//                 }`}
//                 onClick={() => handleTabClick("Disliked Quotes")}
//                 href="#"
//               >
//                 Disliked Quotes
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="quotes-display">
//           {activeTab === "Added Quotes" &&
//             userAddedQuotes.map((quote, index) => (
//               <QuoteItem
//                 key={index}
//                 quote={quote}
//                 userId={userId}
//                 loggedInUserId={loggedInUserId}
//                 getLikedUsers={getLikedUsers}
//                 getAllLikedUsers={getAllLikedUsers}
//                 getDislikedUsers={getDislikedUsers}
//                 getAllDislikedUsers={getAllDislikedUsers}
//               />
//             ))}
          
//           {activeTab === "Liked Quotes" &&
//             allLikedQuotes.map((quote,index) => (
//               <QuoteItem
//                 key={index}
//                 quote={quote}
//                 userId={userId}
//                 loggedInUserId={userId}
//                 getLikedUsers={getLikedUsers}
//                 getAllLikedUsers={getAllLikedUsers}
//                 getDislikedUsers={getDislikedUsers}
//                 getAllDislikedUsers={getAllDislikedUsers}
//               />
//             ))}
//           {activeTab === "Disliked Quotes" &&
//             alldislikedQuotes.map((quote,index) => (
//               <QuoteItem
//                 key={index}
//                 quote={quote}
//                 userId={userId}
//                 loggedInUserId={userId}
//                 getLikedUsers={getLikedUsers}
//                 getAllLikedUsers={getAllLikedUsers}
//                 getDislikedUsers={getDislikedUsers}
//                 getAllDislikedUsers={getAllDislikedUsers}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyQuotes;






import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyQuotes.css";
import QuoteItem from "./QuoteItem";

const MyQuotes = () => {
  const [activeTab, setActiveTab] = useState("Added Quotes");
  const [quotes, setQuotes] = useState([]);
  const [allLikedQuotes, setAllLikedQuotes] = useState([]);
  const [alldislikedQuotes, setAlldislikedQuotes] = useState([]);
  const [userAddedQuotes, setUserAddedQuotes] = useState([]);
  const [totalAddedQuotesCount, setTotalAddedQuotesCount] = useState(0);
  const [totalLikedQuotesCount, setTotalLikedQuotesCount] = useState(0);
  const [totalDislikedQuotesCount, setTotalDislikedQuotesCount] = useState(0);

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
          setTotalLikedQuotesCount(allLikedQuotes.length);
        } else {
          console.error("Liked quotes data might not be an array:", response.data);
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
          setTotalDislikedQuotesCount(alldislikedQuotes.length);
        } else {
          console.error("disliked quotes data might not be an array:", response.data);
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
                {activeTab === "Added Quotes" && (
                  <span className="badge badge-secondary ml-1">
                    {totalAddedQuotesCount}
                  </span>
                )}
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
                {activeTab === "Liked Quotes" && (
                  <span className="badge badge-secondary ml-1">
                    {totalLikedQuotesCount}
                  </span>
                )}
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
                {activeTab === "Disliked Quotes" && (
                  <span className="badge badge-secondary ml-1">
                    {totalDislikedQuotesCount}
                  </span>
                )}
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
                // loggedInUserId={userId}
                getLikedUsers={getLikedUsers}
                getAllLikedUsers={getAllLikedUsers}
                getDislikedUsers={getDislikedUsers}
                getAllDislikedUsers={getAllDislikedUsers}
              />
            ))
          }


          {activeTab === "Liked Quotes" &&
            allLikedQuotes.map((quote,index) => (
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
            alldislikedQuotes.map((quote,index) => (
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


