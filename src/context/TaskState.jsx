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
import { taskReducer } from "./TaskReducer";
import { ListContext } from "./ListState";
import { ACTIONS, SERVER } from "../data/actions";
import { message } from "antd";

const initialState = [];

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

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

const taskTypes = {
  today: "TODAY",
  week: "WEEK",
  overdue: "OVERDUE",
  important: "IMPORTANT",
  tasks: "ALL",
  planner: "ALL",
};

// Create context
export const TaskContext = createContext(initialState);
// Provider component
export const TaskProvider = ({ children }) => {
  const { auth, config } = useContext(AuthContext);
  const { displayList } = useContext(ListContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  const [tags, setTags] = useState([]);
  const [tasksSummary, setTasksSummary] = useState({});

  const handleGetTasks = async (type, payload = {}) => {
    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: {},
    });

    const listID = payload?.listID || null;

    await axiosPrivate
      .get(
        "/tasks/main",
        {
          params: {
            type,
            listID,
          },
        },
        config
      )
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
      priorityLevel: 1,
      dueDate: "",
      details: "",
      sortIndex: state.length || 0,
    };
    dispatch({ type: ACTIONS.CREATE_TASK, payload: newTask });
    let response = await axiosPrivate.post(SERVER.TASKS, { newTask }, config);
  };

  const handleDeleteTask = async (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });
    let response = await axiosPrivate.delete(
      SERVER.TASKS,
      {
        data: { id },
      },
      config
    );
  };

  const handleUpdateTask = async (task) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: task,
    });
    let response = await axiosPrivate.patch(
      SERVER.TASKS,
      {
        roles: auth?.roles,
        action: {
          type: ACTIONS.UPDATE_TASK,
          payload: {
            userName: auth?.user,
            task: task,
          },
        },
      },
      config
    );
  };

  const handleSortTasksList = async (tasks) => {
    dispatch({ type: "SORT_TASKS_LIST", payload: tasks });
    const temp = tasks.map((item, index) => {
      return { id: item.id, sortIndex: index };
    });
    await axiosPrivate
      .patch(
        "/tasks/sort",
        {
          type: "SORT_TASKS_LIST",
          payload: temp,
        },
        config
      )
      .then((response) => {
        if (response.status === 204) message.success("Sort Saved");
      })
      .catch((e) => message.error("Error saving sort"));
  };

  const handleCreateTag = async (tag) => {
    dispatch({ type: ACTIONS.CREATE_TAG, payload: tag });
    let response = await axiosPrivate.post("/tasks/tag", { tag }, config);
  };

  const handleUpdateTag = async (tag) => {
    dispatch({
      type: ACTIONS.UPDATE_TAG,
      payload: tag,
    });
    let response = await axiosPrivate.patch("/tasks/tag", { tag }, config);
  };

  const handleDeleteTag = async (tag) => {
    dispatch({
      type: ACTIONS.REMOVE_TAG,
      payload: tag,
    });
    let response = await axiosPrivate.delete(
      "/tasks/tag",
      {
        data: { tag },
      },
      config
    );
  };

  const handleMoveTaskPlanner = async ({ moveType, moveItem }) => {
    dispatch({ type: moveType, payload: moveItem });
    let newTasks = [];
    if (moveType === "tab") {
    } else if (moveType === "task") {
      const temp = state.filter((item) => item?.status === moveItem?.status);
      newTasks = temp.splice(moveItem.plannerSortIndex).map((item) => {
        return { id: item?.id, plannerSortIndex: item.plannerSortIndex + 1 };
      });
    }
    await axiosPrivate.patch(
      "/tasks/sortPlanner",
      {
        moveItem,
        newTasks,
      },
      config
    );
  };

  // TODO: implement get all tags
  const handleGetTags = async () => {
    await axiosPrivate
      .post("/tags/getAll", {
        roles: auth?.roles,
        action: {
          type: "GET_TAGS",
          payload: { userName: auth?.user },
        },
      })
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setTags(response.data);
        }
      })
      .catch((err) => console.log("Error fetching tags"));
  };

  const fetchTaskSummary = async () => {
    await axiosPrivate
      .get("/tasks/summary", {}, config)
      .then((response) => {
        if (response.status === 200) {
          setTasksSummary(response.data);
        }
      })
      .catch((err) => console.log("Error fetcing summary"));
  };

  useEffect(() => {
    if (displayList?.id) {
      handleGetTasks(displayList?.id);
    }
    if (displayList?.id === "task_list") {
      navigate("/tasks");
    } else {
    }
  }, [displayList?.id]);

  useEffect(() => {
    if (auth?.user && location.pathname.includes("dashboard")) {
      fetchTaskSummary();
    }
  }, [auth, location?.pathname]);

  useEffect(() => {
    if (config?.headers) {
      const type = location?.pathname?.split("/").splice(-1, 1)[0];
      handleGetTasks(type);
    }
  }, [config?.headers?.Authorization, location?.pathname]);

  return (
    <TaskContext.Provider
      value={{
        tasksSummary,

        tasks: state,
        status,
        handleGetTasks,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleSortTasksList,
        handleMoveTaskPlanner,

        tags,
        handleCreateTag,
        handleUpdateTag,
        handleDeleteTag,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
