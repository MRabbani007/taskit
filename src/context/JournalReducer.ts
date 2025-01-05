type JournalAction =
  | { type: "JOURNAL_GET"; payload: JournalItem[] }
  | { type: "JOURNAL_CREATE"; payload: JournalItem }
  | { type: "JOURNAL_UPDATE"; payload: JournalItem }
  | { type: "JOURNAL_DELETE"; payload: string };

export const journalReducer = (
  state: JournalItem[],
  { type, payload }: JournalAction
) => {
  switch (type) {
    case "JOURNAL_GET": {
      return payload;
    }
    case "JOURNAL_CREATE": {
      return [...state, payload];
    }
    case "JOURNAL_UPDATE": {
      const itemIndex = state.findIndex((item) => item.id === payload.id);
      state.splice(itemIndex, 1, payload);
      return [...state];
    }
    case "JOURNAL_DELETE": {
      return state.filter((item) => item.id !== payload);
    }
    default: {
      return state;
    }
  }
};
