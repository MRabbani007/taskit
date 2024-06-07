import { ACTIONS } from "../data/actions";

export const activityReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ACTIVITY_GET: {
      return Array.isArray(payload) && payload.length !== 0
        ? payload.map((item) => {
            return { ...item, progress: 0, tasks: [] };
          })
        : [];
    }
    case ACTIONS.ACTIVITY_CREATE: {
      const newActivity = { ...payload, progress: 0, tasks: [] };
      return [...state, newActivity];
    }
    case ACTIONS.ACTIVITY_UPDATE: {
      const itemIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(itemIndex, 1, payload);
      return [...state];
    }
    case ACTIONS.ACTIVITY_DELETE: {
      return state.filter((item) => item.id !== payload);
    }
    case ACTIONS.ACTIVITY_TASK_GET: {
      const itemIndex = state.findIndex(
        (item) => item.id === payload.activityID
      );
      state[itemIndex].tasks = payload.tasks;
      return [...state];
    }
    case ACTIONS.ACTIVITY_TASK_CREATE: {
      const itemIndex = state.findIndex(
        (item) => item.id === payload.activityID
      );
      state[itemIndex].tasks.push(payload);
      return [...state];
    }
    case ACTIONS.ACTIVITY_TASK_UPDATE: {
      const itemIndex = state.findIndex(
        (item) => item.id === payload.activityID
      );
      const taskIndex = state[itemIndex].tasks.findIndex(
        (item) => item.id === payload.id
      );
      state[itemIndex].tasks.splice(taskIndex, 1, payload);
      return [...state];
    }
    case ACTIONS.ACTIVITY_TASK_DELETE: {
      const itemIndex = state.findIndex(
        (item) => item.id === payload.activityID
      );
      const taskIndex = state[itemIndex].tasks.findIndex(
        (item) => item.id === payload.id
      );
      state[itemIndex].tasks.splice(taskIndex, 1);
      return [...state];
    }
    default: {
      return state;
    }
  }
};
