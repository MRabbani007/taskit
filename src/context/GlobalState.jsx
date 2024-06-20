import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// Imported Data
import { appReducer } from "./AppReducer";
import { getDate } from "../data/utils";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTIONS, SERVER } from "../data/actions";

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
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  const [lists, setLists] = useState([]);
  const [listSummary, setListSummary] = useState([]);

  const navigate = useNavigate();

  // Task list displayed in main container
  const [displayList, setDisplayList] = useState(null);

  const handleGetLists = async () => {
    let response = await axiosPrivate.post(SERVER.GET_LISTS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_LISTS,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setLists(response.data);
    }
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
    dispatch({
      type: ACTIONS.UPDATE_LIST,
      payload: { listID, updateItem, newValue },
    });
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

  const handleGetTasks = async (type, payload = {}) => {
    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: {},
    });

    // let temp;
    // if (type === "TODAY") {
    //   temp = { day: getDate(0) };
    // } else if (type === "WEEK") {
    //   temp = { day: getDate(1), offset: getDate(7) };
    // } else if (type === "OVERDUE") {
    //   temp = { offset: getDate(-1) };
    // } else if (type === "IMPORTANT") {
    //   temp = {};
    // } else if (type === "list") {
    //   temp = payload;
    // } else if (type === "all") {
    //   temp = {};
    // }

    await axiosPrivate
      .post("/tasks", {
        roles: auth?.roles,
        action: {
          type: type,
          payload: { userName: auth?.user, ...payload },
        },
      })
      .then((response) => {
        if (response?.data && Array.isArray(response.data)) {
          dispatch({ type: "GET_TASKS", payload: response.data });
          setStatus({
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: {},
          });
        }
      })
      .catch((err) => {
        setStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: {},
        });
      });
  };

  const handleAddTask = async (listID, taskTitle) => {
    const newTask = {
      id: crypto.randomUUID(),
      listID,
      tags: [],
      title: taskTitle,
      completed: false,
      priority: "low",
      dueDate: "",
      details: "",
    };
    dispatch({ type: ACTIONS.CREATE_TASK, payload: newTask });
    let response = await axiosPrivate.post(SERVER.TASKS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CREATE_TASK,
        payload: { userName: auth?.user, newTask },
      },
    });
  };

  const handleDeleteTask = async (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });
    let response = await axiosPrivate.delete(SERVER.TASKS, {
      data: {
        roles: auth?.roles,
        action: {
          type: ACTIONS.REMOVE_TASK,
          payload: { userName: auth?.user, id: id },
        },
      },
    });
  };

  const handleUpdateTask = async (task) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: task,
    });
    let response = await axiosPrivate.patch(SERVER.TASKS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.UPDATE_TASK,
        payload: {
          userName: auth?.user,
          task: task,
        },
      },
    });
  };

  const handleCreateTag = async (tag) => {
    dispatch({ type: ACTIONS.CREATE_TAG, payload: tag });
    let response = await axiosPrivate.post(SERVER.CREATE_TAG, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CREATE_TAG,
        payload: { userName: auth?.user, tag },
      },
    });
  };

  const handleUpdateTag = async (tag) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { tag },
    });
    let response = await axiosPrivate.post(SERVER.UPDATE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.UPDATE_TASK,
        payload: {
          userName: auth?.user,
          tag,
        },
      },
    });
  };

  const handleDeleteTag = async (tag) => {
    dispatch({
      type: ACTIONS.REMOVE_TAG,
      payload: { tag },
    });
    let response = await axiosPrivate.post(SERVER.REMOVE_TAG, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.REMOVE_TAG,
        payload: {
          userName: auth?.user,
          tag,
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
        temp = lists.find((item) => item.id === list);
      }
    } else if (typeof list === "object") {
      temp = list;
    }
    setDisplayList(temp);
    navigate(`/myLists/tasklist/${temp?.id}`);
  }

  useEffect(() => {
    handleGetTasks(displayList?.id);
    if (displayList?.id === "task_list") {
      navigate("/tasks");
    } else {
    }
  }, [displayList?.id]);

  // Handle closing todo List
  function handleClose() {
    setDisplayList({ id: "task_list" });
  }

  useEffect(() => {
    if (auth?.user) {
      handleGetLists();
      handleListSummary();
    }
  }, [auth?.user]);

  return (
    <GlobalContext.Provider
      value={{
        listNames: lists,
        trash: lists,
        listSummary,
        displayList: displayList,

        tasks: state,
        status,
        handleGetTasks,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,

        handleCreateTag,
        handleUpdateTag,
        handleDeleteTag,

        handleCreateList,
        handleUpdateList,
        handleRemoveList,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
