type NotesAction =
  | { type: "NOTES_GET_USER"; payload: Note[] }
  | { type: "NOTES_CREATE"; payload: Note }
  | { type: "NOTES_UPDATE"; payload: Note }
  | { type: "NOTES_REMOVE"; payload: string }
  | { type: "NOTE_SORT"; payload: Note[] };

export const notesReducer = (state: Note[], { type, payload }: NotesAction) => {
  switch (type) {
    case "NOTES_GET_USER": {
      return payload;
    }
    case "NOTES_CREATE": {
      return [...state, payload];
    }
    case "NOTES_UPDATE": {
      const itemIndex = state.findIndex((item) => item.id === payload?.id);
      state.splice(itemIndex, 1, payload);
      return [...state];
    }
    case "NOTES_REMOVE": {
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
