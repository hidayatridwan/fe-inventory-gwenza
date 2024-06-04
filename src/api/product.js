import axios from "axios";
import { getToken } from "./auth";

export async function createProduct(data) {
  const token = getToken();

  await axios
    .post("http://localhost:3000/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function fetchProducts({ signal }) {
  const token = getToken();

  const response = await axios
    .get("http://localhost:3000/products", {
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });

  return response.data;
}

export async function getProduct({ signal, productId }) {
  const token = getToken();

  const response = await axios
    .get(`http://localhost:3000/products/${productId}`, {
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });

  return response.data;
}

export async function updateProduct(data) {
  const token = getToken();
  const product_id = data.get("product_id");

  await axios
    .put(`http://localhost:3000/products/${product_id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function deleteProduct({ productId }) {
  const token = getToken();

  const response = await axios
    .delete(`http://localhost:3000/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .catch((error) => {
      throw error.response.data;
    });

  return response.data;
}
