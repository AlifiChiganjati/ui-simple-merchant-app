import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASEURL;

export const createProduct = async (
  token,
  name,
  price,
  description,
  point,
  merchantId,
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log("headers: ", headers);
    console.log(`${API_BASE_URL}/product/create`);
    const response = await axios.post(
      `${API_BASE_URL}/product/create`,
      {
        name,
        price,
        description,
        point,
        merchantId,
      },
      {
        headers,
      },
    );
    console.log("response create product: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
