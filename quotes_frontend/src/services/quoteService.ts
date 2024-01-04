import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
// const apiUrl = (import.meta.env as any).VITE_API_URL;

const quoteService = {
  getQuotes: async (searchParam) => {
    try {
      let url = `${baseURL}/quotes`;

      if (searchParam) {
        url += searchParam;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  likeQuote: async (quoteId, token) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`${baseURL}/quotes/${quoteId}/like/up`,{},{ headers });
        return response.data;
      } catch (error) {
        throw error;
      }
  },

  dislikeQuote: async (quoteId, token) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`${baseURL}/quotes/${quoteId}/dislike/up`,{},{ headers });
        return response.data;
      } catch (error) {
        throw error;
      }
  },

  getLikedUsers: async (quoteId, token) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${baseURL}/quotes/${quoteId}/like/users`,
          { headers }
        );

        return response.data.users;
      } catch (error) {
        throw error;
      }
  },

  getDislikedUsers: async (quoteId, token) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${baseURL}/quotes/${quoteId}/dislike/users`,{ headers });
        return response.data.users;
      } catch (error) {
        throw error;
    }
  },

  getAllLikedUsersList: async (quote, token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
    
          const response = await axios.get(`${baseURL}/quotes/${quote.id}/like/users`,{ headers });
          return response.data.users;
    } catch (error) {
        throw error;
    }
  },

  getAllDislikedUsersList: async (quote, token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
    
          const response = await axios.get(`${baseURL}/quotes/${quote.id}/dislike/users`,{ headers });
          return response.data.users;
    } catch (error) {
        throw error;
    }
  },

  addQuote: async (quote, author, tags, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${baseURL}/quotes`,{quote,author,tag: tags.join(","),}, { headers });
      return response.data;

    } catch (error) {
      throw error;
    }
  },

  // API call to save edited quote
  saveEditedQuote: async (quoteId, editedQuote, editedAuthor, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(`${baseURL}/quotes/${quoteId}`,{ quote: editedQuote, author: editedAuthor },{ headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // to render logged in user quote
  getAddedQuotes: async (userId, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${baseURL}/quotes`, { headers });
      const addedQuotes = response.data.filter((quote) => quote.userId === userId);

      return addedQuotes;
    } catch (error) {
      throw error;
    }
  },

  // to render quotes liked by user
  getLikedQuotes: async (userId, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/users/${userId}/favourite-quotes`,
        { headers }
      );

      if (response.data && Array.isArray(response.data.quotes)) {
        return response.data.quotes;
      } else {
        console.error("Liked quotes data might not be an array:", response.data);
        return [];
      }
    } catch (error) {
      throw error;
    }
  },

  // to render all quotes disliked by users
  getDislikedQuotes: async (userId, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${baseURL}/users/${userId}/unfavourite-quotes`,
        { headers }
      );

      if (response.data && Array.isArray(response.data.quotes)) {
        return response.data.quotes;
      } else {
        console.error("Disliked quotes data might not be an array:", response.data);
        return [];
      }
    } catch (error) {
      throw error;
    }
  },

  // to delete a quote that was added by the user
  deleteQuote: async (quoteId, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`${baseURL}/quotes/${quoteId}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default quoteService;