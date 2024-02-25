import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// Imported Data
import { appReducer } from "./AppReducer";
import { getDate } from "../data/utils";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTIONS, SERVER } from "../data/actions";

// Initial state
// App will display only 1 list with its tasks
const initialState = {
  listNames: [],
  trash: [],
  listTasks: [],
  todayTasks: [],
  overdueTasks: [],
  thisWeekTasks: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Display today and this week tasks
  const [todayTasks, setTodayTasks] = useState([]);
  const [weekTasks, setWeekTasks] = useState([]);
  const [listSummary, setListSummary] = useState([]);

  // Task list displayed in main container
  const [displayList, setDisplayList] = useState([]);

  const [viewTab, setViewTab] = useState("tasks");

  // View Create List Component
  const [viewCreateList, setViewCreateList] = useState(false);
  const [viewTasks, setViewTasks] = useState(false);

  const toggleCreateList = () => {
    if (viewCreateList) {
      setViewCreateList(false);
    } else {
      setDisplayList([]);
      setViewCreateList(true);
    }
  };

  const handleGetLists = async () => {
    let response = await axiosPrivate.post(SERVER.GET_LISTS, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_LISTS,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.GET_LISTS, payload: response.data });
    }
  };

  const handleCreateList = async (title = "", icon = "") => {
    const newList = { id: crypto.randomUUID(), title, icon, tasks: [] };
    dispatch({ type: ACTIONS.CREATE_LIST, payload: newList });
    setDisplayList([state.listNames.length]);
    setViewTab("task_list");
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
    setDisplayList((prev) => {
      return prev.filter((item) => item.id !== listID);
    });
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
    console.log(response.data);
  };

  const handleGetTasks = async (listID) => {
    let response = await axiosPrivate.post(SERVER.GET_TASKS_LIST, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TASKS_LIST,
        payload: { userName: auth?.user, listID },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.GET_TASKS_LIST, payload: response.data });
    }
  };

  const handleGetTodayTasks = async () => {
    let response = await axiosPrivate.post(SERVER.GET_TASKS_TODAY, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TASKS_TODAY,
        payload: { userName: auth?.user, day: getDate(0) },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setTodayTasks(response.data);
    }
  };

  const handleGetWeekTasks = async () => {
    let response = await axiosPrivate.post(SERVER.GET_TASKS_WEEK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TASKS_WEEK,
        payload: { userName: auth?.user, day: getDate(0), offset: getDate(7) },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setWeekTasks(response.data);
    }
  };

  const handleAddTask = async (listID, taskTitle) => {
    const newTask = {
      id: crypto.randomUUID(),
      listID,
      title: taskTitle,
      completed: false,
    };
    dispatch({ type: ACTIONS.CREATE_TASK, payload: newTask });
    let response = await axiosPrivate.post(SERVER.CREATE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.CREATE_TASK,
        payload: { userName: auth?.user, newTask },
      },
    });
  };

  const handleDeleteTask = async (taskID) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: taskID });
    let response = await axiosPrivate.post(SERVER.REMOVE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.REMOVE_TASK,
        payload: { userName: auth?.user, taskID },
      },
    });
  };

  const handleUpdateTask = async (taskID, updateItem, newValue) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { taskID, updateItem, newValue },
    });
    let response = await axiosPrivate.post(SERVER.UPDATE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.UPDATE_TASK,
        payload: {
          userName: auth?.user,
          updateData: { taskID, updateItem, newValue },
        },
      },
    });
  };

  const handleToggleTask = async (taskID, newValue) => {
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      payload: { taskID, newValue },
    });
    let response = await axiosPrivate.post(SERVER.UPDATE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.UPDATE_TASK,
        payload: {
          userName: auth?.user,
          updateData: { taskID, updateItem: "task_complete", newValue },
        },
      },
    });
  };

  // Handle opening new todo List
  const handleOpen = (listID) => {
    let listIndex = state.listNames.findIndex((list) => list.id === listID);
    handleGetTasks(listID);
    setViewTab("task_list");
    // setViewCreateList(false);
    setDisplayList([listIndex]);
    // setDisplayList((currentDisplayList) => {
    //   return [
    //     // remove list from display if list already open
    //     ...currentDisplayList.filter((listName) => listName.id !== listID),
    //     // add new list to display
    //     userLists[listIndex],
    //   ];
    // });
  };

  // Handle closing todo List
  function handleClose(listID) {
    setDisplayList((currentDisplayList) => {
      return currentDisplayList.filter(
        (listIndex) => state.listNames[listIndex].id !== listID
      );
    });
    setViewTab("user_lists");
    // TODO: remove tasks related to list from state
  }

  useEffect(() => {
    if (auth?.user) {
      handleGetLists();
      handleListSummary();
      handleGetTodayTasks();
      handleGetWeekTasks();
    }
  }, [auth?.user]);

  return (
    <GlobalContext.Provider
      value={{
        listNames: state.listNames,
        trash: state.trash,
        listSummary: listSummary,
        displayList: displayList,
        listTasks: state.listTasks,
        todayTasks: todayTasks,
        weekTasks: weekTasks,
        overdueTasks: state.overdueTasks,
        viewTab,
        setViewTab,
        viewCreateList,
        viewTasks,
        setViewTasks,
        toggleCreateList,
        handleCreateList,
        handleUpdateList,
        handleRemoveList,
        handleOpen,
        handleClose,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleToggleTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
