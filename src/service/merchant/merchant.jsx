import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASEURL;

export const registerMerchant = async (
  merchantName,
  merchantAddress,
  userId,
  token,
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/merchant/register`,
      {
        userId,
        merchantName,
        merchantAddress,
      },
      {
        headers,
      },
    );
    console.log("response register Merchant", response.data);
    localStorage.removeItem("user");

    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error register Merchant", error);
    throw error;
  }
};
