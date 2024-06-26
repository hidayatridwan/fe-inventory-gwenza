import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function infoProduct({ signal, productCode }) {
  const token = getToken();

  const response = await axios
    .get(`${apiUrl}/transfers/${productCode}`, {
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

export async function createTransfer(data) {
  const token = getToken();

  await axios
    .post(`${apiUrl}/transfers`, data, {
      headers: {
        "Content-Type": "application/json",
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
