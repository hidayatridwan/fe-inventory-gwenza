import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("x-inventory-gwenza-token");

  return redirect("/");
}
