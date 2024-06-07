import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { activityReducer } from "./ActivityReducer";
import { ACTIONS, SERVER } from "../data/actions";

const initialState = [];

// Create context
export const ActivityContext = createContext(initialState);

export const ActivityProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const [fetchTasks, setFetchTasks] = useState(true);
  const [openActivity, setOpenActivity] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleActivityGet = async () => {
    let response = await axiosPrivate.get(SERVER.ACTIVITY, {
      roles: auth?.roles,
      params: { userName: auth?.user },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.ACTIVITY_GET, payload: response.data });
    }
  };

  const handleActivityCreate = async (activity) => {
    dispatch({ type: ACTIONS.ACTIVITY_CREATE, payload: activity });
    let response = await axiosPrivate
      .post(SERVER.ACTIVITY, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.ACTIVITY_CREATE,
          payload: { userName: auth?.user, activity },
        },
      })
      .catch((e) => console.log(e));
    if (response?.status === 204) {
      return true;
    } else {
      return false;
    }
  };

  const handleActivityUpdate = async (activity) => {
    dispatch({
      type: ACTIONS.ACTIVITY_UPDATE,
      payload: activity,
    });
    let response = await axiosPrivate.patch(SERVER.ACTIVITY, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ACTIVITY_UPDATE,
        payload: {
          userName: auth?.user,
          activity,
        },
      },
    });
  };

  const handleActivityDelete = async (activity) => {
    dispatch({
      type: ACTIONS.ACTIVITY_DELETE,
      payload: activity.id,
    });
    let response = await axiosPrivate.delete(SERVER.ACTIVITY, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ACTIVITY_DELETE,
        payload: {
          userName: auth?.user,
          activity,
        },
      },
    });
  };

  const handleOpenActivity = (activityID) => {
    const activity = state.find((item) => item.id === activityID);
    setOpenActivity(activity);
  };

  const handleTasksGet = async (activityID) => {
    let response = await axiosPrivate.get(SERVER.ACTIVITY_TASK, {
      roles: auth?.roles,
      params: { activityID },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({
        type: ACTIONS.ACTIVITY_TASK_GET,
        payload: { activityID, tasks: response.data },
      });
    }
  };

  const handleTaskCreate = async (activityTask) => {
    dispatch({ type: ACTIONS.ACTIVITY_TASK_CREATE, payload: activityTask });
    let response = await axiosPrivate
      .post(SERVER.ACTIVITY_TASK, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.ACTIVITY_TASK_CREATE,
          payload: { userName: auth?.user, activityTask },
        },
      })
      .catch((e) => console.log(e));
    if (response?.status === 204) {
      return true;
    } else {
      return false;
    }
  };

  const handleTaskUpdate = async (activityTask) => {
    dispatch({
      type: ACTIONS.ACTIVITY_TASK_UPDATE,
      payload: activityTask,
    });
    let response = await axiosPrivate.patch(SERVER.ACTIVITY_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ACTIVITY_TASK_UPDATE,
        payload: {
          userName: auth?.user,
          activityTask,
        },
      },
    });
  };

  const handleTaskDelete = async (activityTask) => {
    dispatch({
      type: ACTIONS.ACTIVITY_DELETE,
      payload: activityTask.id,
    });
    let response = await axiosPrivate.delete(SERVER.ACTIVITY_TASK, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ACTIVITY_TASK_DELETE,
        payload: {
          userName: auth?.user,
          activityTask,
        },
      },
    });
  };

  useEffect(() => {
    if (auth?.user) {
      handleActivityGet();
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(state) && state.length !== 0 && fetchTasks) {
      state.forEach((activity) => handleTasksGet(activity.id));
      setFetchTasks(false);
    }
  }, [state]);

  return (
    <ActivityContext.Provider
      value={{
        activities: state,
        openActivity: openActivity,
        handleActivityCreate,
        handleActivityUpdate,
        handleActivityDelete,
        handleOpenActivity,
        handleTaskCreate,
        handleTaskUpdate,
        handleTaskDelete,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
