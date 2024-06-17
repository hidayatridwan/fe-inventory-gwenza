import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "react-router-dom";
import { apiUrl } from "../utils/helper";

export const queryClient = new QueryClient();

export async function auth(data) {
  await axios
    .post(`${apiUrl}/users/login`, data)
    .then((response) => {
      localStorage.setItem(
        "x-inventory-gwenza-token",
        response.data.data.token
      );

      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getToken() {
  return localStorage.getItem("x-inventory-gwenza-token");
}

export function checkNotAuth() {
  const token = getToken();

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp;

    if (Date.now() >= expiry * 1000) {
      localStorage.removeItem("x-inventory-gwenza-token");
      return redirect("/");
    }
  }

  if (!token) {
    return redirect("/");
  }

  return null;
}

export function checkAlreadyAuth() {
  const token = getToken();

  if (token) {
    return redirect("/dashboard");
  }

  return null;
}
