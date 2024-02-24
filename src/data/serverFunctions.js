import axios from "axios";
import { getDate } from "./utils";
import { ACTIONS } from "./actions";

export const fetchServer = async (action) => {
  try {
    let URL = "";
    let DATA = {};
    switch (action.type) {
      // Get user lists
      case ACTIONS.GET_LISTS: {
        URL = SERVER.GET_LISTS;
        DATA = { userName: action.userName };
        break;
      }
      // Create List
      case ACTIONS.CREATE_LIST: {
        URL = SERVER.CREATE_LIST;
        DATA = { userName: action.userName, list: action.list };
        break;
      }
      // Remove List
      case ACTIONS.REMOVE_LIST: {
        URL = SERVER.REMOVE_LIST;
        DATA = { userName: action.userName, listID: action.listID };
        break;
      }
      // Update List
      case ACTIONS.UPDATE_LIST: {
        URL = SERVER.UPDATE_LIST;
        DATA = {
          userName: action.userName,
          listID: action.listID,
          updateData: {
            updateItem: action.updateItem,
            newValue: action.newValue,
          },
        };
        break;
      }
      // Get Tasks in list
      case ACTIONS.GET_TASKS: {
        URL = SERVER.GET_TASKS;
        DATA = { userName: action.userName, listID: action.listID };
        break;
      }
      // Get Tasks for today
      case ACTIONS.GET_TASKS_TODAY: {
        URL = SERVER.GET_TASKS_TODAY;
        DATA = { userName: action.userName, day: getDate(0) };
        break;
      }
      case ACTIONS.GET_TASKS_WEEK: {
        URL = SERVER.GET_TASKS_WEEK;
        DATA = {
          userName: action.userName,
          day: getDate(0),
          offset: getDate(7),
        };
        break;
      }
      // Add Task to list
      case ACTIONS.CREATE_TASK: {
        URL = SERVER.CREATE_TASK;
        DATA = {
          userName: action.userName,
          listID: action.listID,
          taskTitle: action.taskTitle,
        };
        break;
      }
      // Remove Task from list
      case ACTIONS.REMOVE_TASK: {
        URL = SERVER.REMOVE_TASK;
        DATA = {
          userName: action.userName,
          listID: action.listID,
          taskID: action.taskID,
        };
        break;
      }
      // Update Task
      case ACTIONS.UPDATE_TASK: {
        URL = SERVER.UPDATE_TASK;
        DATA = {
          userName: action.userName,
          updateData: {
            listID: action.listID,
            taskID: action.taskID,
            updateItem: action.updateItem,
            newValue: action.newValue,
          },
        };
        break;
      }
      default: {
      }
    }
    let response = await axios({ method: "post", url: URL, data: DATA });
    return response.data;
  } catch (error) {
    console.log("Fetch Server Error");
    return null; //"Error: Fetch Server"
  }
};

export const fetchUser = async (action) => {
  try {
    let URL = "";
    let DATA = "";
    switch (action.type) {
      case ACTIONS.SIGNIN: {
        URL = SERVER.SIGNIN;
        DATA = { username: action.username, password: action.password };
        break;
      }
      case ACTIONS.SIGNUP: {
        URL = SERVER.SIGNUP;
        DATA = { username: action.username, password: action.password };
        break;
      }
      default: {
      }
    }
    axios.defaults.timeout = 5000;
    let response = await axios({ method: "post", url: URL, data: DATA });
    return response.data;
  } catch (error) {
    return null; //"Error: Signin";
  }
};
