import axios from "axios";

// export const SERVER_URL = "http://localhost:3000";

export const SERVER_URL = "https://todoapp-server-hj1x.onrender.com";

export const ACTIONS = {
  GET_LISTS: "GET_LISTS",
  CREATE_LIST: "CREATE_LIST",
  REMOVE_LIST: "REMOVE_LIST",
  UPDATE_LIST: "UPDATE_LIST",
  GET_TASKS: "GET_TASKS",
  GET_TASKS_TODAY: "GET_TASKS_TODAY",
  CREATE_TASK: "CREATE_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

export const SERVER = {
  GET_LISTS: "/lists/get",
  CREATE_LIST: "/lists/create",
  REMOVE_LIST: "/lists/remove",
  UPDATE_LIST: "/lists/update",
  GET_TASKS: "/tasks/get",
  GET_TASKS_TODAY: "/tasks/getToday",
  CREATE_TASK: "/tasks/create",
  REMOVE_TASK: "/tasks/remove",
  UPDATE_TASK: "/tasks/update",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
};

export const fetchServer = async (action) => {
  try {
    let URL = "";
    let DATA = {};
    switch (action.type) {
      // Get user lists
      case ACTIONS.GET_LISTS: {
        URL = SERVER_URL + SERVER.GET_LISTS;
        DATA = { userName: action.userName };
        break;
      }
      // Create List
      case ACTIONS.CREATE_LIST: {
        URL = SERVER_URL + SERVER.CREATE_LIST;
        DATA = { userName: action.userName, list: action.list };
        break;
      }
      // Remove List
      case ACTIONS.REMOVE_LIST: {
        URL = SERVER_URL + SERVER.REMOVE_LIST;
        DATA = { userName: action.userName, listID: action.listID };
        break;
      }
      // Update List
      case ACTIONS.UPDATE_LIST: {
        URL = SERVER_URL + SERVER.UPDATE_LIST;
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
        URL = SERVER_URL + SERVER.GET_TASKS;
        DATA = { userName: action.userName, listID: action.listID };
        break;
      }
      case ACTIONS.GET_TASKS_TODAY: {
        URL = SERVER_URL + SERVER.GET_TASKS_TODAY;
        DATA = { userName: action.userName };
        break;
      }
      // Add Task to list
      case ACTIONS.CREATE_TASK: {
        URL = SERVER_URL + SERVER.CREATE_TASK;
        DATA = {
          userName: action.userName,
          listID: action.listID,
          taskTitle: action.taskTitle,
        };
        break;
      }
      // Remove Task from list
      case ACTIONS.REMOVE_TASK: {
        URL = SERVER_URL + SERVER.REMOVE_TASK;
        DATA = {
          userName: action.userName,
          listID: action.listID,
          taskID: action.taskID,
        };
        break;
      }
      // Update Task
      case ACTIONS.UPDATE_TASK: {
        URL = SERVER_URL + SERVER.UPDATE_TASK;
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
    console.log(error);
  }
};

export const fetchUser = async (action) => {
  try {
    let URL = "";
    let DATA = "";
    switch (action.type) {
      case ACTIONS.SIGNIN: {
        URL = SERVER_URL + SERVER.SIGNIN;
        DATA = { username: action.username, password: action.password };
        break;
      }
      case ACTIONS.SIGNUP: {
        URL = SERVER_URL + SERVER.SIGNUP;
        DATA = { username: action.username, password: action.password };
        break;
      }
      default: {
      }
    }
    let response = await axios({ method: "post", url: URL, data: DATA });
    return response.data;
  } catch (error) {
    return "Error: Signin";
  }
};

// TODO: remove
export const fetchCreateList = async (userName, list) => {
  try {
    let response = await axios({
      method: "post",
      url: SERVER_URL + SERVER_ACTIONS.CREATE_LIST,
      data: {
        userName: userName,
        list: list,
      },
    });
    alert(response.data);
  } catch (error) {
    console.log(error);
  }
};

// TODO: remove
export const fetchRemoveList = async (userName, listID) => {
  try {
    let response = await axios({
      method: "post",
      url: "http://localhost:3000/lists/remove",
      data: {
        userName: userName,
        listID: listID,
      },
    });
    alert(response.data);
  } catch (error) {
    console.log(error);
  }
};

// TODO: remove
export const fetchGetUserLists = async (userName) => {
  try {
    let response = await axios({
      method: "post",
      url: "http://localhost:3000/lists/get",
      data: {
        userName: userName,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: Get Lists");
  }
};

// TODO: remove
export const fetchAddTask = async (userName, listID, task) => {
  try {
    let response = await axios({
      method: "post",
      url: "/tasks/create",
      data: {
        userName: userName,
        listID: listID,
        task: task,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: Get Lists");
  }
};

// TODO: remove
export const fetchGetTasks = async (userName, listID) => {
  try {
    let response = await axios({
      method: "post",
      url: "http://localhost:3000/tasks/get",
      data: {
        userName: userName,
        listID: listID,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: Get Lists");
  }
};
