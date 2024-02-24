import { ACTIONS } from "../data/actions";

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      return { ...state, listNames: payload };
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
        (item) => item.id === payload.id
      );
      state.listNames.splice(listIndex, 1, payload);
      return {
        ...state,
      };
    }
    case ACTIONS.GET_TASKS_LIST: {
      return { ...state, listTasks: payload };
    }
    default:
      return state;
  }
};
