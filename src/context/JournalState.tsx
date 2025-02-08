import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
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

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(journalReducer, []);
  const [status, setStatus] = useState(initialStatus);
  const [isModified, setIsModified] = useState(false);

  const handleJournalGet = async () => {
    try {
      const response = await axiosPrivate.get(SERVER.JOURNAL, config);
      if (response.status === 200 && Array.isArray(response.data)) {
        dispatch({ type: "JOURNAL_GET", payload: response.data });
      }
    } catch (error) {
    } finally {
      setIsModified(false);
    }
  };

  const handleJournalCreate = async (journal: JournalItem) => {
    try {
      dispatch({ type: "JOURNAL_CREATE", payload: journal });
      const response = await axiosPrivate.post(
        SERVER.JOURNAL,
        { payload: journal },
        config
      );
      setIsModified(true);
    } catch (error) {}
  };

  const handleJournalUpdate = async (journal: JournalItem) => {
    try {
      dispatch({
        type: "JOURNAL_UPDATE",
        payload: journal,
      });
      const response = await axiosPrivate.patch(
        SERVER.JOURNAL,
        { payload: journal },
        config
      );
      setIsModified(true);
      return response;
    } catch (error) {}
  };

  const handleJournalDelete = async (id: string) => {
    try {
      dispatch({
        type: "JOURNAL_DELETE",
        payload: id,
      });
      const response = await axiosPrivate.post(
        SERVER.JOURNAL,
        { payload: id },
        config
      );
      setIsModified(true);
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    if (auth?.user) {
      handleJournalGet();
    }
  }, [auth?.user]);

  useEffect(() => {
    if (auth?.user && isModified) {
      handleJournalGet();
    }
  }, [isModified]);

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
