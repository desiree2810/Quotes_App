import React from 'react'
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const authService = {
    login: async (loginData) => {
        try {
          const response = await axios.post(`${baseURL}/auth/sign-in`, loginData);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    
      signup: async (registerData) => {
        try {
          const response = await axios.post(`${baseURL}/auth/sign-up`, registerData);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
}

export default authService
