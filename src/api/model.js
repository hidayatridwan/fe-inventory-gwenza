import axios from "axios";
import { getToken } from "./auth";
import { apiUrl } from "../utils/helper";

export async function createModel(data) {
  const token = getToken();

  await axios
    .post(`${apiUrl}/models`, data, {
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

export async function fetchModels({ signal, filters }) {
  const token = getToken();
  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", filters.page);
  }
  if (filters.size) {
    params.append("size", filters.size);
  }
  if (filters.model_name) {
    params.append("model_name", filters.model_name);
  }

  const query = params;

  const response = await axios
    .get(`${apiUrl}/models?${query}`, {
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

export async function getModel({ signal, modelId }) {
  const token = getToken();

  const response = await axios
    .get(`${apiUrl}/models/${modelId}`, {
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

export async function updateModel(data) {
  const token = getToken();
  const { model_id, ...newData } = data;

  await axios
    .put(`${apiUrl}/models/${model_id}`, newData, {
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

export async function deleteModel({ modelId }) {
  const token = getToken();

  const response = await axios
    .delete(`${apiUrl}/models/${modelId}`, {
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
