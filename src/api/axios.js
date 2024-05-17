import axios from "axios";

let BASE_URL = "https://todoapp-server-hj1x.onrender.com";
// BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
