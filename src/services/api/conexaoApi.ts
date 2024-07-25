import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4090",
  headers: {
    "Content-Type": "application/json",
  },
});
