import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASEURL;

export const registerUser = async (fullname, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, {
      fullname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      username,
      password,
    });
    if (response.data.data) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
