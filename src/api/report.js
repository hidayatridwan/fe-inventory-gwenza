import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function stockCard({ signal, category, productCode }) {
  const token = getToken();

  const params = new URLSearchParams();
  params.append("category", category);
  params.append("product_code", productCode);

  const response = await axios
    .get(`${apiUrl}/reports/stock-card?${params}`, {
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

export async function inventoryStock({ signal, category }) {
  const token = getToken();

  const params = new URLSearchParams();
  params.append("category", category);

  const response = await axios
    .get(`${apiUrl}/reports/inventory-stock?${params}`, {
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
