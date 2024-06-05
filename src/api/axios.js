import axios from "axios";

let BASE_URL;
// BASE_URL = "https://todoapp-server-hj1x.onrender.com";
// BASE_URL = "https://todo-app-server-mohamad-rabanis-projects.vercel.app/";
BASE_URL = "http://localhost:3000";

let ORIGIN = "https://mrabbani007.github.io/todolist/";
ORIGIN = "http://localhost:5173";

export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // },
  // withCredentials: false,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
