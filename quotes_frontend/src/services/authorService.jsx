import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const authorService = {
    authorsList: async () => {
        try{
            const response = await axios.get(`${baseURL}/quotes`);
            return response;
        }catch(error){
            throw error;
        }
    }
}

export default authorService;