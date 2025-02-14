import axios from "axios";

const local = false && window?.location?.origin.includes("localhost");

let BASE_URL = local
  ? "http://localhost:3000"
  : "https://todoapp-server-hj1x.onrender.com";

let ORIGIN = local
  ? "http://localhost:5173"
  : "https://mrabbani007.github.io/todolist/";

// BASE_URL = "https://todo-app-server-mohamad-rabanis-projects.vercel.app/";
// BASE_URL = ;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Accept: "*/*",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ORIGIN,
    // Accept: "*/*",
  },
  withCredentials: true,
});
