import axios from "axios";
import { getToken } from "./auth";

export async function createTailor(data) {
  const token = getToken();

  await axios
    .post("http://localhost:3000/tailors", data, {
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

export async function fetchTailors({ signal }) {
  const token = getToken();

  const response = await axios
    .get("http://localhost:3000/tailors", {
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

export async function getTailor({ signal, tailorId }) {
  const token = getToken();

  const response = await axios
    .get(`http://localhost:3000/tailors/${tailorId}`, {
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

export async function updateTailor(data) {
  const token = getToken();
  const { tailor_id, ...newData } = data;

  await axios
    .put(`http://localhost:3000/tailors/${tailor_id}`, newData, {
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

export async function deleteTailor({ tailorId }) {
  const token = getToken();

  const response = await axios
    .delete(`http://localhost:3000/tailors/${tailorId}`, {
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
