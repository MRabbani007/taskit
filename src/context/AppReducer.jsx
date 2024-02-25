import { ACTIONS } from "../data/actions";

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      let temp = payload.filter(
        (item) => item?.trash === undefined || item?.trash === false
      );
      return { ...state, listNames: temp };
    }
    case ACTIONS.CREATE_LIST: {
      return {
        ...state,
        listNames: [...state.listNames, payload],
      };
    }
    case ACTIONS.REMOVE_LIST: {
      let temp = state.listNames.filter((item) => item.id !== payload);
      return {
        ...state,
        listNames: temp,
      };
    }
    case ACTIONS.UPDATE_LIST: {
      let listIndex = state.listNames.findIndex(
        (item) => item.id === payload.listID
      );
      let newList = state.listNames[listIndex];
      if (payload?.updateItem === "list_title") {
        newList.title = payload.newValue;
      } else if (payload?.updateItem === "list_icon") {
        newList.icon = payload.newValue;
      } else if (payload?.updateItem === "trash") {
        newList.trash = payload.newValue;
      } else if (payload?.updateItem === "un_trash") {
        newList.trash = payload.newValue;
      }
      state.listNames.splice(listIndex, 1, newList);
      console.log(newList);
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
