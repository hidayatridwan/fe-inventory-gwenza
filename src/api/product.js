import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function createProduct(data) {
  const token = getToken();

  await axios
    .post(`${apiUrl}/products`, data, {
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

export async function fetchProducts({ signal, filters }) {
  const token = getToken();
  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", filters.page);
  }
  if (filters.size) {
    params.append("size", filters.size);
  }
  if (filters.product_code) {
    params.append("product_code", filters.product_code);
  }
  if (filters.product_name) {
    params.append("product_name", filters.product_name);
  }

  const response = await axios
    .get(`${apiUrl}/products?${params}`, {
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .catch((error) => {
      console.log(error);
      throw error.response.data;
    });

  return response.data;
}

export async function getProduct({ signal, productId }) {
  const token = getToken();

  const response = await axios
    .get(`${apiUrl}/products/${productId}`, {
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
    .put(`${apiUrl}/products/${product_id}`, data, {
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
    .delete(`${apiUrl}/products/${productId}`, {
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
