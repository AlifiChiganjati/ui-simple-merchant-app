import axios from "axios";

export const getAccessToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
