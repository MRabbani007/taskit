import { ACTIONS } from "../data/actions";

export const journalReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.JOURNAL_GET: {
      return payload;
    }
    case ACTIONS.JOURNAL_CREATE: {
      return [...state, payload];
    }
    case ACTIONS.JOURNAL_UPDATE: {
      const itemIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(itemIndex, 1, payload);
      return [...state];
    }
    case ACTIONS.JOURNAL_DELETE: {
      return state.filter((item) => item.id !== payload);
    }
    default: {
      return state;
    }
  }
};
