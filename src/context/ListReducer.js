import { ACTIONS } from "../data/actions";

export const listReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      const pinnedLists = payload
        .filter((list) => list?.trash !== true && list?.pinned === true)
        .sort((a, b) => a.sortIndex - b.sortIndex);
      const userLists = payload
        .filter((list) => list?.trash !== true && list?.pinned !== true)
        .sort((a, b) => a.sortIndex - b.sortIndex); // handle false or undefined
      const trashLists = payload.filter((list) => list?.trash === true);
      return { pinnedLists, userLists, trashLists };
    }
    case ACTIONS.CREATE_LIST: {
      return { ...state, userLists: [...state.userLists, payload] };
    }
    case ACTIONS.REMOVE_LIST: {
      return {
        ...state,
        trashLists: state.trashLists.filter((item) => item.id !== payload),
      };
    }
    case "SORT_LIST_USER": {
      return { ...state, userLists: payload };
    }
    case "SORT_LIST_PINNED": {
      return { ...state, pinnedLists: payload };
    }
    case ACTIONS.UPDATE_LIST: {
      const { updateItem, newValue, listID } = payload;
      let listIndex = state.userLists.findIndex((item) => item.id === listID);
      if (!listIndex || !state.userLists[listIndex]) {
        return { ...state };
      } else if (updateItem === "list_title") {
        state.userLists[listIndex].title = newValue;
      } else if (updateItem === "list_icon") {
        state.userLists[listIndex].icon = newValue;
      } else if (updateItem === "list_pin") {
        state.userLists[listIndex].pinned = newValue;
      } else if (updateItem === "trash") {
        state.userLists[listIndex].trash = true;
      } else if (updateItem === "un_trash") {
        state.trash[listIndex].trash = false;
      }
      return { ...state };
    }
    default:
      return state;
  }
};
