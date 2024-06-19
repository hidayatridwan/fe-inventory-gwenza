export const formattedDate = (data) =>
  new Date(data).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const apiUrl = import.meta.env.VITE_API_URL;

export const formattedNumber = (data) =>
  new Intl.NumberFormat("en-US").format(data);
