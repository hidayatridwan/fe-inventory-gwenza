import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "react-router-dom";

export const queryClient = new QueryClient();

export async function auth(data) {
  await axios
    .post("http://localhost:3000/users/login", data)
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
