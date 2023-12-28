import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddQuote.css';

const AddQuoteScreen = () => {
  const navigateToHomepage = useNavigate();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTags] = useState('');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('The loggedin user token is', token);
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
      } else {
        console.error('Failed to add quote');
      }
    } catch (error) {
      console.error('Error during quote addition:', error);
    }
  };

  const handleCancel = () => {
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
          </div>

          <div className="input-container">
            <label>Author</label>
            <input
              type="text"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Tags</label>
            <input
              type="text"
              placeholder="Enter tags"
              value={tag}
              onChange={(e) => setTags(e.target.value)}
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
    </div>
  );
};

export default AddQuoteScreen;
