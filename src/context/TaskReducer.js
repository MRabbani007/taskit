import { ACTIONS } from "../data/actions";

export const taskReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_TASKS": {
      return payload;
    }
    case ACTIONS.CREATE_TASK: {
      return [...state, payload];
    }
    case ACTIONS.REMOVE_TASK: {
      return [...state.filter((item) => item.id !== payload)];
    }
    case ACTIONS.UPDATE_TASK: {
      let taskIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(taskIndex, 1, payload);
      return [...state];
    }
    case "SORT_TASKS_LIST": {
      const newTasks = payload.map((item, index) => {
        return { ...item, sortIndex: index };
      });
      return newTasks;
    }
    case ACTIONS.CREATE_TAG: {
      let taskIndex = state.findIndex((item) => item.id === payload.taskID);
      state[taskIndex]?.tags.push(payload);
      return [...state];
    }
    case ACTIONS.UPDATE_TAG: {
      let taskIndex = state.findIndex((item) => item.id === payload.taskID);
      const tagIndex = state[taskIndex]?.tags.findIndex(
        (item) => item?._id === payload._id
      );
      state[taskIndex]?.tags.splice(tagIndex, 1, payload);
      return [...state];
    }
    case ACTIONS.REMOVE_TAG: {
      let taskIndex = state.findIndex((item) => item.id === payload.taskID);
      const tagIndex = state[taskIndex]?.tags.findIndex(
        (item) => item?._id === payload._id
      );
      state[taskIndex]?.tags.splice(tagIndex, 1);
      return [...state];
    }
    default:
      return state;
  }
};
