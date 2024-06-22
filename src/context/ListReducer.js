import { ACTIONS } from "../data/actions";

export const listReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      const pinnedLists = payload.filter((list) => list?.pinned === true);
      const notPinned = payload.filter((list) => list?.pinned !== true); // handle false or undefined
      return [...pinnedLists, ...notPinned];
    }
    case ACTIONS.CREATE_LIST: {
      return [...state, payload];
    }
    case ACTIONS.REMOVE_LIST: {
      return state.filter((item) => item.id !== payload);
    }
    case ACTIONS.UPDATE_LIST: {
      const { updateItem, newValue, listID } = payload;
      let listIndex = state.findIndex((item) => item.id === listID);
      if (updateItem === "list_title") {
        state[listIndex].title = newValue;
      } else if (updateItem === "list_icon") {
        state[listIndex].icon = newValue;
      } else if (updateItem === "list_pin") {
        state[listIndex].icon = newValue;
      } else if (updateItem === "trash") {
        state[listIndex].trash = true;
      } else if (updateItem === "un_trash") {
        state[listIndex].trash = false;
      }
      return [...state];
    }
    default:
      return state;
  }
};
