// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './AddQuote.css';

// const AddQuoteScreen = () => {
//   const navigateToHomepage = useNavigate();
//   const [quote, setQuote] = useState('');
//   const [author, setAuthor] = useState('');
//   const [tag, setTags] = useState('');

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log('The loggedin user token is', token);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const userId = decodedToken.userId;
//       console.log('The userId extracted from the token is ', userId);

//       const response = await axios.post(
//         'http://localhost:3000/quotes',
//         {
//           quote,
//           author,
//           tag,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         const result = response.data;
//         console.log('Quote added successfully:', result);
//       } else {
//         console.error('Failed to add quote');
//       }
//     } catch (error) {
//       console.error('Error during quote addition:', error);
//     }
//   };

//   const handleCancel = () => {
//     console.log('Cancelled');
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
//           </div>

//           <div className="input-container">
//             <label>Author</label>
//             <input
//               type="text"
//               placeholder="Enter author"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//             />
//           </div>

//           <div className="input-container">
//             <label>Tags</label>
//             <input
//               type="text"
//               placeholder="Enter tags"
//               value={tag}
//               onChange={(e) => setTags(e.target.value)}
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
//     </div>
//   );
// };

// export default AddQuoteScreen;





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './AddQuote.css';

// const AddQuoteScreen = () => {
//   const navigateToHomepage = useNavigate();
//   const [quote, setQuote] = useState('');
//   const [author, setAuthor] = useState('');
//   const [tag, setTags] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleSave = async () => {
//     try {

//        // Validate inputs
//        const errors = validateInputs();
//        if (Object.keys(errors).length > 0) {
//          setValidationErrors(errors);
//          return;
//        }

//       const token = localStorage.getItem('token');
//       console.log('The loggedin user token is', token);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const userId = decodedToken.userId;
//       console.log('The userId extracted from the token is ', userId);

//       const response = await axios.post(
//         'http://localhost:3000/quotes',
//         {
//           quote,
//           author,
//           tag,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         const result = response.data;
//         console.log('Quote added successfully:', result);
//       } else {
//         console.error('Failed to add quote');
//       }

//     } catch (error) {
//       console.error('Error during quote addition:', error);
//     }
//   };

//   const validateInputs = () => {
//     const errors = {};

//     // Quote validation
//     if (!quote.trim()) {
//       errors.quote = 'Quote cannot be empty';
//     } else if (quote.split(/\s+/).length < 10 || quote.split(/\s+/).length > 50) {
//       errors.quote = 'Quote should be between 10 and 50 words';
//     }

//     // Author validation
//     if (!author.trim()) {
//       errors.author = 'Author cannot be empty';
//     }

//     // Tags validation
//     if (!tag.trim()) {
//       errors.tag = 'Tags cannot be empty';
//     } else {
//       const tagArray = tag.split(',').map((tag) => tag.trim());
//       if (tagArray.length > 8) {
//         errors.tag = 'Too many tags, maximum is 8';
//       }
//     }

//     return errors;
//   };

//   const handleCancel = () => {
//     console.log('Cancelled');
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
//             <input
//               type="text"
//               placeholder="Enter tags"
//               value={tag}
//               onChange={(e) => setTags(e.target.value)}
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
//     </div>
//   );
// };

// export default AddQuoteScreen;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddQuote.css';

const AddQuoteScreen = () => {
  const navigateToHomepage = useNavigate();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTags] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

      
      const token = localStorage.getItem('token');
      console.log('The logged-in user token is', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;
      console.log('The userId extracted from the token is ', userId);

      const response = await axios.post(
        'http://localhost:3000/quotes',
        {
          quote,
          author,
          tag, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const result = response.data;
        console.log('Quote added successfully:', result);

        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);

        setQuote('');
        setAuthor('');
        setTags('');
      } else {
        console.error('Failed to add quote');
      }
    } catch (error) {
      console.error('Error during quote addition:', error);
    }
  };

  const validateInputs = () => {
    const errors = {};

    // Quote validation
    if (!quote.trim()) {
      errors.quote = 'Quote cannot be empty';
    } else if (quote.split(/\s+/).length < 10 || quote.split(/\s+/).length > 50) {
      errors.quote = 'Quote should be between 10 and 50 words';
    }

    // Author validation
    if (!author.trim()) {
      errors.author = 'Author cannot be empty';
    }

    // Tags validation
    if (!tag.trim()) {
      errors.tag = 'Tags cannot be empty';
    } else {
      const tagArray = tag.split(',').map((tag) => tag.trim());
      if (tagArray.length > 8) {
        errors.tag = 'Too many tags, maximum is 8';
      }
    }

    return errors;
  };

  const handleCancel = () => {
    // Clear form fields
    setQuote('');
    setAuthor('');
    setTags('');
    console.log('Cancelled');
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
            <input
              type="text"
              placeholder="Enter tags"
              value={tag}
              onChange={(e) => setTags(e.target.value)}
            />
            {validationErrors.tag && (
              <div className="error-message">{validationErrors.tag}</div>
            )}
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
