// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AddQuote.css";
// import quoteService from "../../services/quoteService";

// const AddQuoteScreen = () => {
//   const navigateToHomepage = useNavigate();
//   const [quote, setQuote] = useState("");
//   const [author, setAuthor] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});
//   const [showSuccessToast, setShowSuccessToast] = useState(false);
//   const [tag, setTags] = useState([]);

//   const handleSave = async () => {
//     try {
//       const errors = validateInputs();
//       if (Object.keys(errors).length > 0) {
//         setValidationErrors(errors);

//         setTimeout(() => {
//           setValidationErrors({});
//         }, 5000);

//         return;
//       }

//       const token = localStorage.getItem("token");
//       console.log("The logged-in user token is", token);
//       const decodedToken = JSON.parse(atob(token.split(".")[1]));
//       const userId = decodedToken.userId;
//       console.log("The userId extracted from the token is ", userId);

//       const tagsString = tag.join(","); //to join the tag array
//       console.log("tagsString =", tagsString);

//       const response = await axios.post(
//         "http://localhost:3000/quotes",
//         {
//           quote,
//           author,
//           tag: tagsString,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         const result = response.data;
//         console.log("Quote added successfully:", result);

//         setShowSuccessToast(true);
//         setTimeout(() => {
//           setShowSuccessToast(false);
//         }, 3000);

//         setQuote("");
//         setAuthor("");
//         setTags([]);
//       } else {
//         console.error("Failed to add quote");
//       }
//     } catch (error) {
//       console.error("Error during quote addition:", error);
//     }
//   };

//   const validateInputs = () => {
//     const errors = {};

//     // Quote validation
//     if (!quote.trim()) {
//       errors.quote = "Quote cannot be empty";
//     } else if (
//       quote.split(/\s+/).length < 10 ||
//       quote.split(/\s+/).length > 50
//     ) {
//       errors.quote = "Quote should be between 10 and 50 words";
//     }

//     // Author validation
//     if (!author.trim()) {
//       errors.author = "Author cannot be empty";
//     }

//     // Tags validation
//     if (tag.length === 0) {
//       errors.tag = "Tags cannot be empty";
//     } else if (tag.length > 8) {
//       errors.tag = "Too many tags, maximum is 8";
//     }

//     return errors;
//   };

//   const handleCancel = () => {
//     // Clear form fields
//     setQuote("");
//     setAuthor("");
//     setTags("");
//     console.log("Cancelled");
//   };

//   const addTags = (event) => {
//     if (event.key === "Enter" && event.target.value !== "") {
//       setTags([...tag, event.target.value]);
//       event.target.value = "";
//     }
//   };

//   const removeTags = (index) => {
//     setTags([...tag.filter((_, i) => i !== index)]);
//   };

//   return (
//     <div className="addQuotecontainer">
//       <div className="quote-form-container">
//         <h1 className="title">Add Quote</h1>

//         <div className="innercontatiner">
//           <div className="input-container">
//             <label>Quote</label>
//             <textarea
//               placeholder="Enter quote"
//               value={quote}
//               onChange={(e) => setQuote(e.target.value)}
//               rows="2"
//             />
//             {validationErrors.quote && (
//               <div className="error-message">{validationErrors.quote}</div>
//             )}
//           </div>

//           <div className="input-container">
//             <label>Author</label>
//             <input
//               type="text"
//               placeholder="Enter author"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//             />
//             {validationErrors.author && (
//               <div className="error-message">{validationErrors.author}</div>
//             )}
//           </div>

//           <div className="input-container">
//             <label>Tags</label>
//             <ul>
//               {tag.length > 0 &&
//                 tag.map((tag, index) => (
//                   <li key={index}>
//                     <span>{tag}</span>
//                     <i
//                       className="material-icons"
//                       onClick={() => removeTags(index)}
//                     >
//                       close
//                     </i>
//                   </li>
//                 ))}
//             </ul>
//             <input
//               type="text"
//               onKeyUp={(event) => addTags(event)}
//               placeholder="Press enter to add tags"
//             />
//           </div>

//           <div className="button-container">
//             <button className="save-button" onClick={handleSave}>
//               SAVE ✅
//             </button>
//             <button className="cancel-button" onClick={handleCancel}>
//               CANCEL ❌
//             </button>
//           </div>
//         </div>
//       </div>
//       {showSuccessToast && (
//         <div className="toast success-toast">Quote added successfully!</div>
//       )}
//     </div>
//   );
// };

// export default AddQuoteScreen;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddQuote.css";
import quoteService from "../../services/quoteService";

const AddQuoteScreen = () => {
  const navigateToHomepage = useNavigate();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [tag, setTags] = useState([]);


  const token = localStorage.getItem("token");
  // console.log("The logged-in user token is", token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.userId;
  // console.log("The userId extracted from the token is ", userId);

  const handleSave = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);

        setTimeout(() => {
          setValidationErrors({});
        }, 5000);

        return;
      }

      try{
        const result = await quoteService.addQuote(quote, author, tag, token);
        console.log("Quote added successfully:", result);

        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);

        setQuote("");
        setAuthor("");
        setTags([]);
      } catch {
        console.error("Failed to add quote");
      }
    } catch (error) {
      console.error("Error during quote addition:", error);
    }
  };

  const validateInputs = () => {
    const errors = {};

    // Quote validation
    if (!quote.trim()) {
      errors.quote = "Quote cannot be empty";
    } else if (
      quote.split(/\s+/).length < 10 ||
      quote.split(/\s+/).length > 50
    ) {
      errors.quote = "Quote should be between 10 and 50 words";
    }

    // Author validation
    if (!author.trim()) {
      errors.author = "Author cannot be empty";
    }

    // Tags validation
    if (tag.length === 0) {
      errors.tag = "Tags cannot be empty";
    } else if (tag.length > 8) {
      errors.tag = "Too many tags, maximum is 8";
    }

    return errors;
  };

  const handleCancel = () => {
    // Clear form fields
    setQuote("");
    setAuthor("");
    setTags("");
    console.log("Cancelled");
  };

  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tag, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (index) => {
    setTags([...tag.filter((_, i) => i !== index)]);
  };

  return (
    <div className="addQuotecontainer">
      <div className="quote-form-container">
        <h1 className="title">Add Quote</h1>

        <div className="innercontatiner">
          <div className="input-container">
            <label>Quote</label>
            <textarea
              placeholder="Enter quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows="2"
            />
            {validationErrors.quote && (
              <div className="error-message">{validationErrors.quote}</div>
            )}
          </div>

          <div className="input-container">
            <label>Author</label>
            <input
              type="text"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {validationErrors.author && (
              <div className="error-message">{validationErrors.author}</div>
            )}
          </div>

          <div className="input-container">
            <label>Tags</label>
            <ul>
              {tag.length > 0 &&
                tag.map((tag, index) => (
                  <li key={index}>
                    <span>{tag}</span>
                    <i
                      className="material-icons"
                      onClick={() => removeTags(index)}
                    >
                      close
                    </i>
                  </li>
                ))}
            </ul>
            <input
              type="text"
              onKeyUp={(event) => addTags(event)}
              placeholder="Press enter to add tags"
            />
          </div>

          <div className="button-container">
            <button className="save-button" onClick={handleSave}>
              SAVE ✅
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              CANCEL ❌
            </button>
          </div>
        </div>
      </div>
      {showSuccessToast && (
        <div className="toast success-toast">Quote added successfully!</div>
      )}
    </div>
  );
};

export default AddQuoteScreen;
