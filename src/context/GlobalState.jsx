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

  // Task list displayed in main container
  const [displayList, setDisplayList] = useState([]);

  const [viewTab, setViewTab] = useState("user_lists");

  // View Create List Component
  const [viewCreateList, setViewCreateList] = useState(false);
  const [viewTasks, setViewTasks] = useState(false);

  const handleViewTab = (tab) => {
    if (tab === "tasks") {
      handleGetTodayTasks();
      handleGetWeekTasks();
      handleGetImportantTasks();
      handleGetOverdueTasks();
    }
    if (tab === "user_lists") {
      handleListSummary();
      handleGetTasks("task_list");
    }
    if (tab === "task_list") {
      if (displayList?.length === 0) {
        setViewTab("user_lists");
      } else {
        setViewTab("task_list");
      }
    } else {
      setViewTab(tab);
    }
    navigate("/");
  };

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
    handleViewTab("task_list");
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

  const handleUpdateTask = async (taskID, updateItem, newValue, listID) => {
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

  const handleNotesGetUser = async () => {
    let response = await axiosPrivate.post(SERVER.NOTES_GET_USER, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_GET_USER,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.NOTES_GET_USER, payload: response.data });
    }
  };

  const handleNotesCreate = async (title = "") => {
    let newNote = {
      id: crypto.randomUUID(),
      title,
      details: "",
      priority: "normal",
      tags: [],
      trash: false,
    };
    dispatch({ type: ACTIONS.NOTES_CREATE, payload: newNote });
    let response = await axiosPrivate.post(SERVER.NOTES_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_CREATE,
        payload: { userName: auth?.user, newNote },
      },
    });
  };

  const handleNotesUpdate = async (noteIdx, newNote) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { noteIdx, newNote },
    });
    let response = await axiosPrivate.post(SERVER.NOTES_UPDATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_UPDATE,
        payload: {
          userName: auth?.user,
          newNote,
        },
      },
    });
  };

  const handleNotesRemove = async (noteIdx, noteID) => {
    dispatch({ type: ACTIONS.NOTES_REMOVE, payload: noteID });
    let response = await axiosPrivate.post(SERVER.REMOVE_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_REMOVE,
        payload: { userName: auth?.user, noteID },
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
    navigate("/tasklist");
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
    handleViewTab("user_lists");
    // TODO: remove tasks related to list from state
  }

  async function deleteAllTags() {
    let response = await axiosPrivate.post("/tasks/deleteAllTags", {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_UPDATE,
        payload: {
          userName: auth?.user,
        },
      },
    });
  }

  // useEffect(()=>{},[])

  useEffect(() => {
    if (auth?.user) {
      handleGetLists();
      handleListSummary();
      handleGetTodayTasks();
      handleGetWeekTasks();
      handleGetImportantTasks();
      handleGetOverdueTasks();
      handleNotesGetUser();
      handleGetTasks("task_list");
      handleTagsGetAll();
      // deleteAllTags();
    }
  }, [auth?.user]);

  return (
    <GlobalContext.Provider
      value={{
        listNames: state.listNames,
        trash: state.trash,
        notes: state.notes,
        tags: state.tags,

        listSummary: listSummary,
        displayList: displayList,

        listTasks: state.listTasks,
        todayTasks: todayTasks,
        weekTasks: weekTasks,
        importantTasks: importantTasks,
        overdueTasks: overdueTasks,

        viewTab,
        handleViewTab,
        viewTasks,
        setViewTasks,

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
        handleToggleTask,

        handleNotesCreate,
        handleNotesUpdate,
        handleNotesRemove,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
