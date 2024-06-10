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
const initialState = {
  listNames: [],
  notes: [],
  trash: [],
  listTasks: [],
  userTasks: [],
  tags: [],
  taskTags: [],
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

  const navigate = useNavigate();

  // Display today and this week tasks
  const [todayTasks, setTodayTasks] = useState([]);
  const [weekTasks, setWeekTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [listSummary, setListSummary] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Task list displayed in main container
  const [displayList, setDisplayList] = useState(null);

  // View Create List Component
  const [viewCreateList, setViewCreateList] = useState(false);

  const toggleCreateList = () => {
    if (viewCreateList) {
      setViewCreateList(false);
    } else {
      setDisplayList(null);
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

  // Get list Tasks
  function handleGetTasks(listID) {
    axiosPrivate
      .get(SERVER.TASKS, {
        params: {
          listID,
        },
      })
      .then((result) => {
        if (result?.data && Array.isArray(result.data)) {
          dispatch({ type: ACTIONS.GET_TASKS_LIST, payload: result.data });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  function handleGetAllTasks() {
    axiosPrivate
      .get(SERVER.TASKS_ALL, {
        params: {
          userName: auth?.user,
        },
      })
      .then((result) => {
        if (result?.data && Array.isArray(result.data)) {
          setUserTasks(result.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  function handleGetTasksUser(listID) {
    axiosPrivate
      .get(SERVER.TASKS_USER, {
        params: {
          userName: auth?.user,
        },
      })
      .then((result) => {
        if (result?.data && Array.isArray(result.data)) {
          setTasks(result.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

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
        payload: { userName: auth?.user, day: getDate(1), offset: getDate(7) },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setWeekTasks(response.data);
    }
  };

  const handleGetImportantTasks = async () => {
    let response = await axiosPrivate.post(SERVER.GET_TASKS_IMPORTANT, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TASKS_IMPORTANT,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setImportantTasks(response.data);
    }
  };

  const handleGetOverdueTasks = async () => {
    let response = await axiosPrivate.post(SERVER.GET_TASKS_OVERDUE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TASKS_OVERDUE,
        payload: { userName: auth?.user, offset: getDate(-1) },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      setOverdueTasks(response.data);
    }
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

  const handleUpdateTask = async (type, task) => {
    dispatch({
      type: type,
      payload: task,
    });
    let response = await axiosPrivate.patch(SERVER.TASKS, {
      roles: auth?.roles,
      action: {
        type: type,
        payload: {
          userName: auth?.user,
          task: task,
        },
      },
    });
    return response?.data;
  };

  const handleTagsGetAll = async (taskID) => {
    let response = await axiosPrivate.post(SERVER.GET_TAGS_ALL, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TAGS_ALL,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.GET_TAGS_ALL, payload: response.data });
    }
  };

  const handleTagsGetTask = async (taskID) => {
    let response = await axiosPrivate.post(SERVER.GET_TAGS_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TAGS_TASK,
        payload: { userName: auth?.user, taskID },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.GET_TAGS_TASK, payload: response.data });
    }
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
  function handleOpen(listID) {
    let list = state.listNames.find((list) => list.id === listID);
    setDisplayList(list);
    navigate(`/myLists/tasklist/${listID}`);
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
      handleGetTodayTasks();
      handleGetWeekTasks();
      handleGetImportantTasks();
      handleGetOverdueTasks();
      handleGetTasksUser();
      handleGetAllTasks();
      // handleTagsGetAll();
    }
  }, [auth?.user]);

  return (
    <GlobalContext.Provider
      value={{
        listNames: state.listNames,
        trash: state.trash,
        tags: state.tags,

        listSummary: listSummary,
        displayList: displayList,

        listTasks: state.listTasks,
        todayTasks: todayTasks,
        weekTasks: weekTasks,
        importantTasks: importantTasks,
        overdueTasks: overdueTasks,
        tasks: tasks,
        userTasks: userTasks,

        handleCreateTag,
        handleUpdateTag,
        handleDeleteTag,

        toggleCreateList,
        handleCreateList,
        handleUpdateList,
        handleRemoveList,
        handleOpen,
        handleClose,

        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
