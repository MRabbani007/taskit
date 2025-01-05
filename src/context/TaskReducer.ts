type TaskAction =
  | { type: "GET_TASKS"; payload: Task[] }
  | { type: "CREATE_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "REMOVE_TASK"; payload: string }
  | { type: "SORT_TASKS_LIST"; payload: Task[] }
  | { type: "tab"; payload: Task }
  | { type: "task"; payload: Task }
  | {
      type: "CREATE_TAG";
      payload: Tag & { taskID: string };
    }
  | {
      type: "UPDATE_TAG";
      payload: Tag & { taskID: string };
    }
  | {
      type: "REMOVE_TAG";
      payload: Tag & { taskID: string };
    };

export const taskReducer = (state: Task[], { type, payload }: TaskAction) => {
  switch (type) {
    case "GET_TASKS": {
      return payload;
    }
    case "CREATE_TASK": {
      return [payload, ...state];
    }
    case "REMOVE_TASK": {
      return [...state.filter((item) => item.id !== payload)];
    }
    case "UPDATE_TASK": {
      let taskIndex = state.findIndex((item) => item.id === payload.id);
      const temp = [...state];
      temp.splice(taskIndex, 1, payload);
      return temp;
    }
    case "SORT_TASKS_LIST": {
      const newTasks = payload.map((item, index) => {
        return { ...item, sortIndex: index };
      });
      return newTasks;
    }
    case "tab": {
      const index = state?.findIndex((item) => item?.id === payload?.id);
      state?.splice(index, 1, payload);
      return [...state];
    }
    case "task": {
      const inTabTasks: Task[] = [];
      const outOfTabTasks: Task[] = [];
      state.forEach((element) => {
        if (element.id === payload?.id) {
        } else if (element.status === payload?.status) {
          inTabTasks.push(element);
        } else {
          outOfTabTasks.push(element);
        }
      });
      const temp = inTabTasks
        .sort((a, b) => (a?.plannerSortIndex > b.plannerSortIndex ? 1 : -1))
        .map((item, index) => {
          return {
            ...item,
            plannerSortIndex:
              index >= payload?.plannerSortIndex
                ? item.plannerSortIndex + 1
                : item.plannerSortIndex,
          };
        });
      temp?.splice(payload.plannerSortIndex, 0, payload);
      return [...outOfTabTasks, ...temp];
    }
    case "CREATE_TAG": {
      let taskIndex = state.findIndex((item) => item.id === payload.taskID);
      state[taskIndex]?.tags.push(payload);
      return [...state];
    }
    case "UPDATE_TAG": {
      let taskIndex = state.findIndex((item) => item.id === payload.taskID);
      const tagIndex = state[taskIndex]?.tags.findIndex(
        (item) => item?._id === payload._id
      );
      state[taskIndex]?.tags.splice(tagIndex, 1, payload);
      return [...state];
    }
    case "REMOVE_TAG": {
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
