import { ACTIONS } from "../data/actions";

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      let listNames = payload.filter(
        (item) => item?.trash === undefined || item?.trash === false
      );
      let trash = payload.filter((item) => item?.trash === true);
      return { ...state, listNames: listNames, trash: trash };
    }
    case ACTIONS.CREATE_LIST: {
      return {
        ...state,
        listNames: [...state.listNames, payload],
      };
    }
    case ACTIONS.REMOVE_LIST: {
      let temp = state.trash.filter((item) => item.id !== payload);
      return {
        ...state,
        trash: temp,
      };
    }
    case ACTIONS.UPDATE_LIST: {
      let listIndex = -1;
      let newList = {};
      if (payload?.updateItem === "list_title") {
        listIndex = state.listNames.findIndex(
          (item) => item.id === payload.listID
        );
        newList = state.listNames[listIndex];
        newList.title = payload.newValue;
        state.listNames.splice(listIndex, 1, newList);
      } else if (payload?.updateItem === "list_icon") {
        listIndex = state.listNames.findIndex(
          (item) => item.id === payload.listID
        );
        newList = state.listNames[listIndex];
        newList.icon = payload.newValue;
        state.listNames.splice(listIndex, 1, newList);
      } else if (payload?.updateItem === "trash") {
        listIndex = state.listNames.findIndex(
          (item) => item.id === payload.listID
        );
        newList = state.listNames[listIndex];
        newList = { ...newList, trash: true };
        state.listNames.splice(listIndex, 1);
        state.trash.push(newList);
      } else if (payload?.updateItem === "un_trash") {
        listIndex = state.trash.findIndex((item) => item.id === payload.listID);
        newList = state.trash[listIndex];
        newList = { ...newList, trash: false };
        state.trash.splice(listIndex, 1);
        state.listNames.push(newList);
      }
      return {
        ...state,
      };
    }
    case ACTIONS.GET_TASKS_LIST: {
      return { ...state, listTasks: payload };
    }
    case ACTIONS.CREATE_TASK: {
      return { ...state, listTasks: [...state.listTasks, payload] };
    }
    case ACTIONS.REMOVE_TASK: {
      let temp = state.listTasks.filter((item) => item.id !== payload);
      return {
        ...state,
        listTasks: temp,
      };
    }
    case ACTIONS.UPDATE_TASK: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.taskID
      );
      let newTask = state.listTasks[taskIndex];
      if (payload?.updateItem === "task_title") {
        newTask.title = payload.newValue;
      } else if (payload?.updateItem === "due_date") {
        newTask.dueDate = payload.newValue;
      } else if (payload?.updateItem === "detail") {
        newTask.details = payload.newValue;
      } else if (payload?.updateItem === "priority") {
        newTask.priority = payload.newValue;
      } else if (payload?.updateItem === "add_tag") {
        newTask.tags.push(payload.newValue);
      }
      state.listTasks.splice(taskIndex, 1, newTask);
      return {
        ...state,
      };
    }
    case ACTIONS.TOGGLE_TASK: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.taskID
      );
      state.listTasks[taskIndex].completed = payload.newValue;
      return { ...state };
    }
    default:
      return state;
  }
};
