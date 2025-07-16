export const formattedDate = (data) => new Date(data);

export const apiUrl = import.meta.env.VITE_API_URL;
export const apiImage = import.meta.env.VITE_API_IMAGE;

export const formattedNumber = (data) =>
  new Intl.NumberFormat("en-US").format(data);
