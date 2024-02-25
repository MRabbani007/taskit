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
      let temp = state.listNames.filter((item) => item.id !== payload);
      return {
        ...state,
        listNames: temp,
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
        newList.trash = payload.newValue;
        state.listNames.splice(listIndex, 1);
        state.trash.push(newList);
      } else if (payload?.updateItem === "un_trash") {
        listIndex = state.trash.findIndex((item) => item.id === payload.listID);
        newList = state.trash[listIndex];
        newList.trash = payload.newValue;
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
