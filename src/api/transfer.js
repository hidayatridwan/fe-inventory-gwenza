import axios from "axios";
import { getToken } from "./auth";

export async function infoProduct({ signal, productCode }) {
  const token = getToken();

  const response = await axios
    .get(`http://localhost:3000/transfers/${productCode}`, {
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
    .post("http://localhost:3000/transfers", data, {
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
