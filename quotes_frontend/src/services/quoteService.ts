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

};

export default quoteService;
