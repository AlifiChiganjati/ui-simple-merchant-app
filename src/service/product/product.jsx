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

export const getAllProduct = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${API_BASE_URL}/product/list`, {
      headers,
    });
    console.log("response get all product: ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProduct = async (
  token,
  name,
  price,
  description,
  point,
  productId,
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      `${API_BASE_URL}/product/update/${productId}`,
      {
        name,
        price,
        description,
        point,
      },
      {
        headers,
      },
    );
    console.log("response update product: ", response.data);
    console.log("ini productId: ", productId);
    return response.data;
  } catch (error) {
    console.log("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(
      `${API_BASE_URL}/product/delete/${productId}`,
      {
        headers,
      },
    );
    console.log("response delete product: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
