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
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

type JournalState = {
  journal: JournalItem[];
  categories: JournalCategory[];
  status: FetchStatus;

  handleJournalCreate: (journal: JournalItem) => void;
  handleJournalUpdate: (journal: JournalItem) => void;
  handleJournalDelete: (id: string) => void;
};

const initialStatus: FetchStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

const initialState: JournalState = {
  journal: [],
  categories: [],
  status: initialStatus,
  handleJournalCreate: () => {},
  handleJournalUpdate: () => {},
  handleJournalDelete: () => {},
};

// Create context
export const JournalContext = createContext(initialState);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [params] = useSearchParams();

  const cat = params.get("cat");

  // Store data
  const [state, dispatch] = useReducer(journalReducer, []);
  const [categories, setCategories] = useState<JournalCategory[]>([]);

  const [status, setStatus] = useState(initialStatus);
  const [isModified, setIsModified] = useState(false);

  const handleJournalGet = async () => {
    try {
      const cat = params.get("cat");

      const response = await axiosPrivate.get(SERVER.JOURNAL, {
        params: { cat },
        ...config,
      });
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

      if (response.status === 204) {
        toast.success("Item added");
      }
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

      if (response?.status === 204) {
        toast.success("Item updated");
      }
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

  const handleGetCategories = async () => {
    try {
      const response = await axiosPrivate.get("/journal/categories", config);

      if (response?.status === 200) {
        setCategories(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (auth?.user) {
      handleJournalGet();
      handleGetCategories();
    }
  }, [auth?.user]);

  useEffect(() => {
    if (auth?.user) {
      handleJournalGet();
    }
  }, [isModified, cat]);

  return (
    <JournalContext.Provider
      value={{
        journal: state,
        categories,
        status,
        handleJournalCreate,
        handleJournalUpdate,
        handleJournalDelete,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
