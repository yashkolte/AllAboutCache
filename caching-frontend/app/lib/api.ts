import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 🔹 Axios instance to make API requests
export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
