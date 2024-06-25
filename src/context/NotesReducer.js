import { ACTIONS } from "../data/actions";

export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.NOTES_GET_USER: {
      return payload;
    }
    case ACTIONS.NOTES_CREATE: {
      return [...state, payload];
    }
    case ACTIONS.NOTES_UPDATE: {
      const itemIndex = state.findIndex(
        (item) => item.id === payload?.newNote?.id
      );
      state.splice(itemIndex, 1, payload?.newNote);
      return [...state];
    }
    case ACTIONS.NOTES_REMOVE: {
      return state.filter((item) => item.id !== payload);
    }
    case "NOTE_SORT": {
      return payload;
    }
    default: {
      return state;
    }
  }
};
