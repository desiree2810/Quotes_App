import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const authService = {
  login: async (loginData: any) => {
    try {
      const response = await axios.post(`${baseURL}/auth/sign-in`, loginData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  signup: async (registerData: any) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/sign-up`,
        registerData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
