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
import { message } from "antd";

const initialState = { userLists: [], pinnedLists: [], trashLists: [] };

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
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  // const [userLists, setUserLists] = useState([]);
  // const [trashLists, setTrashLists] = useState([]);

  // useEffect(() => {
  //   setUserLists(() => state.filter((item) => item?.trash !== true));
  //   setTrashLists(() => state.filter((item) => item?.trash === true));
  // }, [state]);

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
      .get("/lists/main", {}, config)
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
    let response = await axiosPrivate.post(
      "/lists/main",
      {
        payload: newList,
      },
      config
    );
  };

  const handleUpdateList = async (listID, updateItem, newValue) => {
    dispatch({
      type: ACTIONS.UPDATE_LIST,
      payload: { listID, updateItem, newValue },
    });
    if (updateItem === "trash" && displayList?.id === listID) {
      handleClose(listID);
    }
    let response = await axiosPrivate.patch(
      "/lists/main",
      {
        type: updateItem,
        payload: {
          listID,
          updateItem,
          newValue,
        },
      },
      config
    );
  };

  const handleRemoveList = async (id) => {
    dispatch({ type: ACTIONS.REMOVE_LIST, payload: id });
    setDisplayList(null);
    await axiosPrivate
      .delete("/lists/main", { data: { id } }, config)
      .then((response) => {
        if (response.status === 204) {
          message.success("List deleted");
        }
      })
      .catch((err) => message.error("Error deleting list"));
  };

  const handleSort = async (location, newLists) => {
    const lists = newLists.map((item, index) => {
      return { ...item, sortIndex: index };
    });
    const type =
      location === "pinnedLists" ? "SORT_LIST_PINNED" : "SORT_LIST_USER";
    dispatch({ type, payload: lists });
    const temp = newLists.map((item, index) => {
      return { id: item.id, sortIndex: index };
    });
    await axiosPrivate
      .patch(
        "/lists/sort",
        {
          lists: temp,
        },
        config
      )
      .then((response) => {
        if (response.status === 204) message.success("Sort Saved");
      })
      .catch((e) => message.error("Error saving sort"));
  };

  const handleListSummary = async () => {
    let response = await axiosPrivate.post(SERVER.GET_LIST_SUMMARY, {}, config);
    if (response?.data && Array.isArray(response.data)) {
      setListSummary(response.data);
    }
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
    if (auth?.user && config?.headers) {
      handleGetLists();
      handleListSummary();
    }
  }, [config, location?.pathname]);

  return (
    <ListContext.Provider
      value={{
        status,
        lists: [...state.pinnedLists, ...state.userLists],
        userLists: state.userLists,
        pinnedLists: state.pinnedLists,
        trashLists: state.trashLists,
        listSummary,
        displayList,

        handleOpen,
        handleClose,

        handleCreateList,
        handleUpdateList,
        handleRemoveList,
        handleSort,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
