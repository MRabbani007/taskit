import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import { taskReducer } from "./TaskReducer";
import { SERVER } from "../data/actions";
import { message } from "antd";
import AuthContext from "./AuthProvider";

export type TaskState = {
  tasks: Task[];
  count: number;
  tasksSummary: TasksSummary | undefined;
  status: FetchStatus;
  filters: TASKFILTER | undefined;
  tags: Tag[];
  setFilters: Dispatch<SetStateAction<TASKFILTER>>;
  handleGetTasks: (payload: any) => void;
  handleAddTask: (task: Task) => void;
  handleUpdateTask: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  handleSortTasksList: (tasks: Task[]) => void;
  handleMoveTaskPlanner: ({
    moveType,
    moveItem,
  }: {
    moveType: string;
    moveItem: Task;
  }) => void;
  handleCreateTag: (tag: Tag & { taskID: string }) => void;
  handleUpdateTag: (tag: Tag & { taskID: string }) => void;
  handleDeleteTag: (tag: Tag & { taskID: string }) => void;
};

const initialState: TaskState = {
  tasks: [],
  count: 0,
  tasksSummary: undefined,
  status: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: {},
  },
  filters: undefined,
  setFilters: () => {},
  tags: [],
  handleGetTasks: () => {},
  handleAddTask: () => {},
  handleUpdateTask: () => {},
  handleDeleteTask: () => {},
  handleSortTasksList: () => {},
  handleMoveTaskPlanner: () => {},
  handleCreateTag: () => {},
  handleUpdateTag: () => {},
  handleDeleteTag: () => {},
};

// const taskTypes = {
//   today: "TODAY",
//   week: "WEEK",
//   overdue: "OVERDUE",
//   important: "IMPORTANT",
//   tasks: "ALL",
//   planner: "ALL",
// };

type TASKFILTER = {
  viewFilter: boolean;
  viewSort: boolean;
  showCompleted: boolean;
  showPLow: boolean;
  showPNormal: boolean;
  showPHigh: boolean;
  sort: string;
  filterLists: boolean;
  inLists: string[];
};

const TASK_FILTER: TASKFILTER = {
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
export const TaskContext = createContext<TaskState>(initialState);
// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // Store data
  const [state, dispatch] = useReducer(taskReducer, []);
  const [count, setCount] = useState(0);

  const [status, setStatus] = useState<FetchStatus>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: {},
  });

  const [isModified, setIsModified] = useState(false);

  const [filters, setFilters] = useState(TASK_FILTER);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  const [tags, setTags] = useState([]);
  const [tasksSummary, setTasksSummary] = useState(undefined);

  const handleGetTasks = async ({
    type,
    listID,
    priority,
    comp,
    page,
    ipp = 10,
  }: {
    type: string;
    listID?: string;
    priority?: string;
    comp: boolean;
    page?: string;
    ipp?: number;
  }) => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: {},
      });

      const response = await axiosPrivate.get("/tasks/main", {
        params: {
          type,
          listID,
          priority,
          comp,
          page,
          ipp,
        },
        ...config,
      });

      if (response?.data?.data && Array.isArray(response.data.data)) {
        dispatch({ type: "GET_TASKS", payload: response.data.data });
        setCount(response.data.count);
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
    } finally {
      setIsModified(false);
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      dispatch({ type: "CREATE_TASK", payload: task });

      const response = await axiosPrivate.post(
        SERVER.TASKS,
        { newTask: task },
        config
      );

      setIsModified(false);
    } catch (error) {}
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      dispatch({
        type: "UPDATE_TASK",
        payload: task,
      });

      const response = await axiosPrivate.patch(
        SERVER.TASKS,
        {
          task,
        },
        config
      );

      if (response?.status === 204) {
        message.success("Task updated");
      } else {
        message.error("Error updating task");
      }
    } catch (error) {}
  };

  const handleDeleteTask = async (id: string) => {
    dispatch({ type: "REMOVE_TASK", payload: id });

    await axiosPrivate.delete(SERVER.TASKS, {
      ...config,
      data: { id },
    });
  };

  const handleSortTasksList = async (tasks: Task[]) => {
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
      .catch(() => message.error("Error saving sort"));
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
      result = result.filter((item) => filters.inLists.includes(item?.listID));
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
          new Date(a?.createdAt ?? 0).getTime() -
          new Date(b?.createdAt ?? 0).getTime()
      );
    }
    if (filters.sort === "createDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(b?.createdAt ?? 0).getTime() -
          new Date(a?.createdAt ?? 0).getTime()
      );
    }
    if (filters.sort === "dueDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(a?.dueDate).getTime() - new Date(b?.dueDate || 0).getTime()
      );
    }
    if (filters.sort === "dueDate_d") {
      result = payload.sort(
        (a, b) =>
          new Date(b?.dueDate || 0).getTime() -
          new Date(a?.dueDate || 0).getTime()
      );
    }

    setSortedTasks(result);
    return result;
  };

  const handleCreateTag = async (tag: Tag & { taskID: string }) => {
    dispatch({ type: "CREATE_TAG", payload: tag });

    await axiosPrivate.post("/tasks/tag", { tag }, config);
  };

  const handleUpdateTag = async (tag: Tag & { taskID: string }) => {
    dispatch({
      type: "UPDATE_TAG",
      payload: tag,
    });
    await axiosPrivate.patch("/tasks/tag", { tag }, config);
  };

  const handleDeleteTag = async (tag: Tag & { taskID: string }) => {
    dispatch({
      type: "REMOVE_TAG",
      payload: tag,
    });
    await axiosPrivate.delete("/tasks/tag", {
      data: { tag },
      ...config,
    });
  };

  const handleMoveTaskPlanner = async ({
    moveType,
    moveItem,
  }: {
    moveType: string;
    moveItem: Task;
  }) => {
    dispatch({ type: moveType as "tab" | "task", payload: moveItem });
    let newTasks: Partial<Task>[] = [];
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
  // const handleGetTags = async () => {
  //   await axiosPrivate
  //     .post("/tags/getAll", {
  //       roles: auth?.roles,
  //       action: {
  //         type: "GET_TAGS",
  //         payload: { userName: auth?.user },
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200 && Array.isArray(response.data)) {
  //         setTags(response.data);
  //       }
  //     })
  //     .catch((err) => console.log("Error fetching tags"));
  // };

  const fetchTaskSummary = async () => {
    try {
      const response = await axiosPrivate.get("/tasks/summary", config);

      if (response.status === 200) {
        setTasksSummary(response.data);
      }
    } catch (error) {
      console.log("Error fetcing summary");
    }
  };

  useEffect(() => {
    if (auth?.user && location.pathname.includes("dashboard")) {
      fetchTaskSummary();
    }
  }, [auth, location?.pathname]);

  useEffect(() => {
    handleSortTasks();
  }, [state, filters]);

  // useEffect(() => {
  //   if (isModified) {
  //     handleGetTasks();
  //   }
  // }, [isModified]);

  return (
    <TaskContext.Provider
      value={{
        tasksSummary,
        tasks: state,
        count,
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
