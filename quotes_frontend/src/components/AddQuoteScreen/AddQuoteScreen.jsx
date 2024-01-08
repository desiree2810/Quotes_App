// import React, { useState } from "react";
// import "./AddQuote.css";
// import quoteService from "../../services/quoteService";

// const AddQuoteScreen = () => {
//   const [quote, setQuote] = useState("");
//   const [author, setAuthor] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});
//   const [showSuccessToast, setShowSuccessToast] = useState(false);
//   const [tag, setTags] = useState([]);

//   const token = localStorage.getItem("token");

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

//       try{
//         const result = await quoteService.addQuote(quote, author, tag, token);
//         console.log("Quote added successfully:", result);

//         setShowSuccessToast(true);
//         setTimeout(() => {
//           setShowSuccessToast(false);
//         }, 3000);

//         setQuote("");
//         setAuthor("");
//         setTags([]);
//       } catch {
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
//       errors.tag = "Too many tags, maximum is 8 minimum is 1";
//     }

//     return errors;
//   };

//   const handleCancel = () => {
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
//             {validationErrors.tag && (
//               <div className="error-message">{validationErrors.tag}</div>
//             )}
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

import React, { useEffect, useState } from "react";
import "./AddQuote.css";
import quoteService from "../../services/quoteService";
import { useLocation, useParams } from "react-router-dom";
import { getToken } from "../../utils/localstorageUtils";

const AddQuoteScreen = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [tag, setTags] = useState([]);

  const token = getToken()
  const location = useLocation();
  const { id } = useParams();
  console.log(location)

  const [editMode, setEditMode] = useState(false);
  const [editQuote, setEditQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    const { state } = location;

    if (state && state.editMode && state.editQuote) {
      setEditMode(true);
      setEditQuote(state.editQuote);
      setQuote(state.editQuote.quote || "");
      setAuthor(state.editQuote.author || "");
      setTags(state.editQuote.tags || []);
    }
  }, [location]);

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
        if (editMode === false) {
          console.log("creating")
          const result = await quoteService.addQuote(quote, author, tag, token);
          console.log("Quote added successfully:", result);
  
          setShowSuccessToast(true);
          setTimeout(() => {
            setShowSuccessToast(false);
          }, 3000);
  
          setQuote("");
          setAuthor("");
          setTags([]);
        }
        if (editMode === true) {
          console.log("editing")
          const response = await quoteService.saveEditedQuote(state.editQuote.id,state.editQuote.quote,state.editQuote.author,token);
          console.log("response.data = ", response);

          setShowSuccessToast(true);
          setTimeout(() => {
            setShowSuccessToast(false);
          }, 3000);
  
          setQuote("");
          setAuthor("");
        }

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
      errors.tag = "Too many tags, maximum is 8 minimum is 1";
    }

    return errors;
  };

  const handleCancel = () => {
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

          {editMode === false &&
          <div className="input-container">
            <label>Tags</label>
            <ul>
              {tag.length > 0 &&
                tag.map((tag, index) => (
                  <li key={index} style={{marginBottom:"0.5rem"}}>
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
            {validationErrors.tag && (
              <div className="error-message">{validationErrors.tag}</div>
            )}
          </div>
          
          }

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