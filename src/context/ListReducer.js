import { ACTIONS } from "../data/actions";

export const listReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_LISTS: {
      return payload;
      // const pinnedLists = payload
      //   .filter((list) => list?.trash !== true && list?.pinned === true)
      //   .sort((a, b) => a.sortIndex - b.sortIndex);
      // const userLists = payload
      //   .filter((list) => list?.trash !== true && list?.pinned !== true)
      //   .sort((a, b) => a.sortIndex - b.sortIndex); // handle false or undefined
      // const trashLists = payload.filter((list) => list?.trash === true);
      // return { pinnedLists, userLists, trashLists };
    }
    case ACTIONS.CREATE_LIST: {
      return [payload, ...state];
      // return { ...state, userLists: [...state.userLists, payload] };
    }
    case ACTIONS.UPDATE_LIST: {
      let listIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(listIndex, 1);
      return [payload, ...state];
    }
    case ACTIONS.REMOVE_LIST: {
      let listIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(listIndex, 1);
      return [...state];
      // return {
      //   ...state,
      //   trashLists: state.trashLists.filter((item) => item.id !== payload),
      // };
    }
    // TODO fix sort
    case "SORT_LIST_USER": {
      return [...state];
    }
    // TODO fix sort
    case "SORT_LIST_PINNED": {
      return [...state];
    }
    default:
      return state;
  }
};
