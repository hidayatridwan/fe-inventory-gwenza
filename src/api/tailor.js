import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function createTailor(data) {
  const token = getToken();

  await axios
    .post(`${apiUrl}/tailors`, data, {
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

export async function fetchTailors({ signal, filters }) {
  const token = getToken();
  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", filters.page);
  }
  if (filters.size) {
    params.append("size", filters.size);
  }
  if (filters.tailor_name) {
    params.append("tailor_name", filters.tailor_name);
  }

  const query = params;

  const response = await axios
    .get(`${apiUrl}/tailors?${query}`, {
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
    .get(`${apiUrl}/tailors/${tailorId}`, {
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
    .put(`${apiUrl}/tailors/${tailor_id}`, newData, {
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
    .delete(`${apiUrl}/tailors/${tailorId}`, {
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
