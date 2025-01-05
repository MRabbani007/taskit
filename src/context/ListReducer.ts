type TaskListAction =
  | { type: "GET_LISTS"; payload: TaskList[] }
  | { type: "CREATE_LIST"; payload: TaskList }
  | { type: "UPDATE_LIST"; payload: TaskList }
  | { type: "REMOVE_LIST"; payload: string }
  | { type: "SORT_LIST_USER"; payload: TaskList[] }
  | { type: "SORT_LIST_PINNED"; payload: TaskList[] };

export const listReducer = (
  state: TaskList[],
  { type, payload }: TaskListAction
) => {
  switch (type) {
    case "GET_LISTS": {
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
    case "CREATE_LIST": {
      return [payload, ...state];
      // return { ...state, userLists: [...state.userLists, payload] };
    }
    case "UPDATE_LIST": {
      let listIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(listIndex, 1);
      return [payload, ...state];
    }
    case "REMOVE_LIST": {
      let listIndex = state.findIndex((item) => item.id === payload);
      state.splice(listIndex, 1);
      return [...state];
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
