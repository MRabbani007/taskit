import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { listReducer } from "./ListReducer";
import { ACTIONS, SERVER } from "../data/actions";

const initialState = [];

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

// Create context
export const ListContext = createContext(initialState);

// Provider component
export const ListProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  // Task list displayed in main container
  const [displayList, setDisplayList] = useState(null);

  const [listSummary, setListSummary] = useState([]);

  const handleGetLists = async () => {
    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: {},
    });
    await axiosPrivate
      .post(SERVER.GET_LISTS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.GET_LISTS,
          payload: { userName: auth?.user },
        },
      })
      .then((response) => {
        if (response.status === 200 && Array.isArray(response?.data)) {
          dispatch({
            type: ACTIONS.GET_LISTS,
            payload: response.data,
          });
          setStatus({
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: {},
          });
        }
      })
      .catch((err) =>
        setStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: { message: "Error fetching lists" },
        })
      );
  };

  const handleCreateList = async (title = "", icon = "") => {
    const newList = { id: crypto.randomUUID(), title, icon, tasks: [] };
    dispatch({ type: ACTIONS.CREATE_LIST, payload: newList });
    setDisplayList(newList);
    let response = await axiosPrivate.post(SERVER.CREATE_LIST, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CREATE_LIST,
        payload: { userName: auth?.user, newList },
      },
    });
  };

  const handleListSummary = async () => {
    let response = await axiosPrivate.post(SERVER.GET_LIST_SUMMARY, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_LIST_SUMMARY,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      // console.log(response.data);
      setListSummary(response.data);
    }
  };

  const handleRemoveList = async (listID) => {
    dispatch({ type: ACTIONS.REMOVE_LIST, payload: listID });
    setDisplayList(null);
    let response = await axiosPrivate.post(SERVER.REMOVE_LIST, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.REMOVE_LIST,
        payload: { userName: auth?.user, listID },
      },
    });
  };

  const handleUpdateList = async (listID, updateItem, newValue) => {
    // dispatch({
    //   type: ACTIONS.UPDATE_LIST,
    //   payload: { listID, updateItem, newValue },
    // });
    if (updateItem === "trash") {
      handleClose(listID);
    }
    let response = await axiosPrivate.post(SERVER.UPDATE_LIST, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.UPDATE_LIST,
        payload: {
          userName: auth?.user,
          listID,
          updateItem,
          newValue,
        },
      },
    });
  };

  // Handle opening new todo List
  function handleOpen(list) {
    let temp = null;
    if (typeof list === "string") {
      if (list === "task_list") {
        temp = { id: list };
      } else {
        temp = state.find((item) => item.id === list);
      }
    } else if (typeof list === "object") {
      temp = list;
    }
    setDisplayList(temp);
    navigate(`/myLists/tasklist/${temp?.id}`);
  }

  // Handle closing todo List
  function handleClose() {
    setDisplayList({ id: "task_list" });
  }

  useEffect(() => {
    if (auth?.user && location.pathname.includes("dashboard")) {
      handleGetLists();
      handleListSummary();
    }
    if (auth?.user && location.pathname.includes("myLists")) {
      handleGetLists();
      handleListSummary();
    }
  }, [auth?.user, location?.pathname]);

  return (
    <ListContext.Provider
      value={{
        status,
        lists: state,
        trash: state,
        listSummary,
        displayList,

        handleOpen,
        handleClose,

        handleCreateList,
        handleUpdateList,
        handleRemoveList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
