export const URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "http://52.63.160.20:5000/api";
