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
      let temp = state.trash.filter((item) => item.id !== payload);
      return {
        ...state,
        trash: temp,
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
        newList = { ...newList, trash: true };
        state.listNames.splice(listIndex, 1);
        state.trash.push(newList);
      } else if (payload?.updateItem === "un_trash") {
        listIndex = state.trash.findIndex((item) => item.id === payload.listID);
        newList = state.trash[listIndex];
        newList = { ...newList, trash: false };
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
    case ACTIONS.UPDATE_TASK_TITLE: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.id
      );
      state.listTasks[taskIndex].title = payload.title;
      return {
        ...state,
      };
    }
    case ACTIONS.UPDATE_TASK_DUEDATE: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.id
      );
      state.listTasks[taskIndex].dueDate = payload.dueDate;
      return {
        ...state,
      };
    }
    case ACTIONS.UPDATE_TASK_COMPLETE: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.id
      );
      state.listTasks[taskIndex].completed = payload.completed;
      return {
        ...state,
      };
    }
    case ACTIONS.UPDATE_TASK_DETAILS: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.id
      );
      state.listTasks[taskIndex].details = payload.details;
      return {
        ...state,
      };
    }
    case ACTIONS.UPDATE_TASK_PRIORITY: {
      let taskIndex = state.listTasks.findIndex(
        (item) => item.id === payload.id
      );
      state.listTasks[taskIndex].priority = payload.priority;
      return {
        ...state,
      };
    }
    case ACTIONS.GET_TAGS_ALL: {
      return { ...state, tags: payload };
    }
    case ACTIONS.GET_TAGS_TASK: {
      return { ...state, taskTags: payload };
    }
    case ACTIONS.CREATE_TAG: {
      state.tags.push(payload);
      return { ...state, tags: [...state.tags] };
    }
    case ACTIONS.UPDATE_TAG: {
      const tagIndex = state.tags.findIndex((tag) => tag.id === payload.tag.id);
      state.tags[tagIndex].name = payload.tag.name;
      return { ...state, tags: [...state.tags] };
    }
    case ACTIONS.REMOVE_TAG: {
      const tagIndex = state.tags.findIndex((tag) => tag.id === payload.tag.id);
      state.tags.splice(tagIndex, 1);
      return { ...state, tags: [...state.tags] };
    }
    case ACTIONS.NOTES_GET_USER: {
      return { ...state, notes: payload };
    }
    case ACTIONS.NOTES_CREATE: {
      state.notes.push(payload);
      return { ...state };
    }
    case ACTIONS.NOTES_UPDATE: {
      state.notes[payload.noteIdx] = payload.newNote;
      return { ...state };
    }
    case ACTIONS.NOTES_REMOVE: {
      state.notes.filter((item) => item.id !== payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
