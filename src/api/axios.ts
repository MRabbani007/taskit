import axios from "axios";

const local = false && window?.location?.origin.includes("localhost");

let BASE_URL = local
  ? "http://localhost:3000"
  : "https://todoapp-server-hj1x.onrender.com";

// BASE_URL = "https://todo-app-server-mohamad-rabanis-projects.vercel.app/";
// BASE_URL = ;

// let ORIGIN = "https://mrabbani007.github.io/todolist/";
// ORIGIN = "http://localhost:5173";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    // Accept: "*/*",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Accept: "*/*",
  },
  withCredentials: true,
});
