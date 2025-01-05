import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { journalReducer } from "./JournalReducer";
import { SERVER } from "../data/actions";

type JournalState = {
  journal: JournalItem[];
  handleJournalCreate: (journal: JournalItem) => void;
  handleJournalUpdate: (journal: JournalItem) => void;
  handleJournalDelete: (id: string) => void;
};

const initialState: JournalState = {
  journal: [],
  handleJournalCreate: () => {},
  handleJournalUpdate: () => {},
  handleJournalDelete: () => {},
};

// Create context
export const JournalContext = createContext(initialState);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(journalReducer, []);

  const handleJournalGet = async () => {
    const response = await axiosPrivate.get(SERVER.JOURNAL, config);
    if (response.status === 200 && Array.isArray(response.data)) {
      dispatch({ type: "JOURNAL_GET", payload: response.data });
    }
  };

  const handleJournalCreate = async (journal: JournalItem) => {
    dispatch({ type: "JOURNAL_CREATE", payload: journal });
    await axiosPrivate.post(SERVER.JOURNAL, { payload: journal }, config);
  };

  const handleJournalUpdate = async (journal: JournalItem) => {
    dispatch({
      type: "JOURNAL_UPDATE",
      payload: journal,
    });
    await axiosPrivate.patch(SERVER.JOURNAL, { payload: journal }, config);
  };

  const handleJournalDelete = async (id: string) => {
    dispatch({
      type: "JOURNAL_DELETE",
      payload: id,
    });
    await axiosPrivate.post(SERVER.JOURNAL, { payload: id }, config);
  };

  useEffect(() => {
    if (auth?.user) {
      handleJournalGet();
    }
  }, [auth?.user]);

  return (
    <JournalContext.Provider
      value={{
        journal: state,
        handleJournalCreate,
        handleJournalUpdate,
        handleJournalDelete,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
