import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function stockCard({ signal, productCode }) {
  const token = getToken();

  const params = new URLSearchParams();
  params.append("product_code", productCode);

  const query = params;

  const response = await axios
    .get(`${apiUrl}/reports/stock-card?${query}`, {
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

export async function inventoryStock({ signal, filters }) {
  const token = getToken();
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }
  if (filters.date_periode) {
    params.append("date_periode", filters.date_periode);
  }

  const query = params;

  const response = await axios
    .get(`${apiUrl}/reports/inventory-stock?${query}`, {
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

export async function dashboard({ signal, filters }) {
  const token = getToken();
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }
  if (filters.date_periode) {
    params.append("date_periode", filters.date_periode);
  }

  const query = params;

  const response = await axios
    .get(`${apiUrl}/reports/dashboard?${query}`, {
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
