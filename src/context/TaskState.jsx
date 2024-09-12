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

const TASK_FILTER = {
  viewFilter: false,
  viewSort: false,

  showCompleted: true,
  showPLow: true,
  showPNormal: true,
  showPHigh: true,

  sort: "",

  filterLists: false,
  inLists: [],
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

  const [filters, setFilters] = useState(TASK_FILTER);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);

  const [tags, setTags] = useState([]);
  const [tasksSummary, setTasksSummary] = useState({});

  const handleGetTasks = async (type, payload = {}) => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: {},
      });

      const listID = payload?.listID || null;

      const response = await axiosPrivate.get(
        "/tasks/main",
        {
          params: {
            type,
            listID,
          },
        },
        config
      );

      console.log(response);

      if (response?.data && Array.isArray(response.data)) {
        dispatch({ type: "GET_TASKS", payload: response.data });
        setStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: {},
        });
      }
    } catch (error) {
      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: {},
      });
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

  const handleFilterTasks = () => {
    const payload = state;

    if (!Array.isArray(payload)) return [];
    // remove items included in filter and keep others
    let result = payload;
    if (filters?.showCompleted === false) {
      result = result.filter((item) => item.completed === false);
    }
    if (filters?.showPLow === false) {
      result = result.filter((item) => item.priority !== "low");
    }
    if (filters?.showPNormal === false) {
      result = result.filter((item) => item.priority !== "normal");
    }
    if (filters?.showPHigh === false) {
      result = result.filter((item) => item.priority !== "high");
    }
    if (filters?.filterLists === true) {
      result = result.filter((item) => filters.inLists.includes(item.listID));
    }

    setFilteredTasks(result);
    return result;
  };

  const handleSortTasks = () => {
    const payload = handleFilterTasks();

    let result = payload;
    if (filters.sort === "priority_a") {
      result = [
        ...payload.filter((item) => item?.priority === "high"),
        ...payload.filter((item) => item?.priority === "normal"),
        ...payload.filter((item) => item?.priority === "low"),
      ];
    }
    if (filters.sort === "priority_d") {
      result = [
        ...payload.filter((item) => item?.priority === "low"),
        ...payload.filter((item) => item?.priority === "normal"),
        ...payload.filter((item) => item?.priority === "high"),
      ];
    }
    if (filters.sort === "title_a") {
      result = payload.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (filters.sort === "title_d") {
      result = payload.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (filters.sort === "createDate_a") {
      result = payload.sort(
        (a, b) =>
          new Date(a?.createDate).getTime() - new Date(b?.createDate).getTime()
      );
    }
    if (filters.sort === "createDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(b?.createDate || 0).getTime() -
          new Date(a?.createDate || 0).getTime()
      );
    }
    if (filters.sort === "dueDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(a?.dueDate || 0).getTime() -
          new Date(b?.createDate || 0).getTime()
      );
    }
    if (filters.sort === "dueDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(b?.dueDate || 0).getTime() -
          new Date(a?.createDate || 0).getTime()
      );
    }

    setSortedTasks(result);
    return result;
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
    if (auth?.user && location.pathname.includes("dashboard")) {
      fetchTaskSummary();
    }
  }, [auth, location?.pathname]);

  useEffect(() => {
    handleSortTasks();
  }, [state, filters]);

  return (
    <TaskContext.Provider
      value={{
        tasksSummary,

        tasks: sortedTasks,
        status,
        handleGetTasks,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleSortTasksList,
        handleMoveTaskPlanner,

        filters,
        setFilters,

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
