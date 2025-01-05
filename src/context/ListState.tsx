import {
  ReactNode,
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
import { SERVER } from "../data/actions";
import { message } from "antd";

type ListState = {
  status: FetchStatus;
  lists: TaskList[];
  userLists: TaskList[];
  pinnedLists: TaskList[];
  trashLists: TaskList[];
  listSummary: ListSummary[];
  displayList: TaskList | null;
  handleOpen: (taskList: string | TaskList) => void;
  handleClose: () => void;
  handleCreateList: (taskList: TaskList) => void;
  handleUpdateList: (taskList: TaskList) => void;
  handleRemoveList: (id: string) => void;
  handleSort: (location: string, newLists: TaskList[]) => void;
};

// const initialState = { userLists: [], pinnedLists: [], trashLists: [] };
const initialState: ListState = {
  status: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: {},
  },
  lists: [],
  userLists: [],
  pinnedLists: [],
  trashLists: [],
  listSummary: [],
  displayList: null,
  handleOpen: () => {},
  handleClose: () => {},
  handleCreateList: () => {},
  handleUpdateList: () => {},
  handleRemoveList: () => {},
  handleSort: () => {},
};

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

// Create context
export const ListContext = createContext(initialState);

// Provider component
export const ListProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Store data
  const [state, dispatch] = useReducer(listReducer, []);
  const [status, setStatus] = useState(initialStatus);

  const [displayList, setDisplayList] = useState<TaskList | null>(null);
  const [listSummary, setListSummary] = useState<ListSummary[]>([]);

  const handleGetLists = async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: {},
      });

      const response = await axiosPrivate.get("/lists/main", config);

      if (response.status === 200 && Array.isArray(response?.data)) {
        dispatch({
          type: "GET_LISTS",
          payload: response.data,
        });
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
        error: { message: "Error fetching lists" },
      });
    }
  };

  const handleCreateList = async (taskList: TaskList) => {
    dispatch({ type: "CREATE_LIST", payload: taskList });
    setDisplayList(taskList);
    await axiosPrivate.post(
      "/lists/main",
      {
        payload: taskList,
      },
      config
    );
  };

  const handleUpdateList = async (taskList: TaskList) => {
    dispatch({
      type: "UPDATE_LIST",
      payload: taskList,
    });

    if (taskList.trash === true && displayList?.id === taskList.id) {
      handleClose();
    }

    let response = await axiosPrivate.patch(
      "/lists/main",
      {
        taskList,
      },
      config
    );

    return response;
  };

  const handleRemoveList = async (id: string) => {
    try {
      dispatch({ type: "REMOVE_LIST", payload: id });
      setDisplayList(null);
      const response = await axiosPrivate.delete("/lists/main", {
        data: { id },
        ...config,
      });

      if (response.status === 204) {
        message.success("List deleted");
      }
    } catch (error) {
      message.error("Error deleting list");
    }
  };

  const handleSort = async (location: string, newLists: TaskList[]) => {
    try {
      const lists = newLists.map((item, index) => {
        return { ...item, sortIndex: index };
      });
      const type =
        location === "pinnedLists" ? "SORT_LIST_PINNED" : "SORT_LIST_USER";
      dispatch({ type, payload: lists });
      const temp = newLists.map((item, index) => {
        return { id: item.id, sortIndex: index };
      });
      const response = await axiosPrivate.patch(
        "/lists/sort",
        {
          lists: temp,
        },
        config
      );

      if (response.status === 204) message.success("Sort Saved");
    } catch (error) {
      message.error("Error saving sort");
    }
  };

  const handleListSummary = async () => {
    let response = await axiosPrivate.post(SERVER.GET_LIST_SUMMARY, {}, config);
    if (response?.data && Array.isArray(response.data)) {
      setListSummary(response.data);
    }
  };

  // Handle opening new todo List
  function handleOpen(taskList: TaskList | string | null) {
    let temp = null;
    if (typeof taskList === "string") {
      if (taskList === "task_list") {
        temp = { id: taskList };
      } else {
        temp = state.find((item) => item.id === taskList);
      }
    } else if (typeof taskList === "object") {
      temp = taskList;
    }
    if (temp) {
      setDisplayList(temp as TaskList);
    }
    navigate(`/myLists/tasklist/${temp?.id}`);
  }

  // Handle closing todo List
  function handleClose() {
    setDisplayList(null);
    // { id: "task_list" }
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
        lists: state.filter((item) => item.trash !== true),
        userLists: state.filter(
          (item) => item.trash !== true && item.pinned !== true
        ),
        pinnedLists: state.filter(
          (item) => item.trash !== true && item.pinned === true
        ),
        trashLists: state.filter((item) => item.trash === true),
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
