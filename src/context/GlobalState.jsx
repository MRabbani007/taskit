import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Data
import { appReducer } from "./AppReducer";
import { getDate } from "../data/utils";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTIONS, SERVER } from "../data/actions";
import { ListContext } from "./ListState";

// Initial state
// App will display only 1 list with its tasks
const initialState = [];

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const { displayList } = useContext(ListContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
