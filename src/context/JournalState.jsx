import { createContext, useContext, useEffect, useReducer } from "react";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { journalReducer } from "./JournalReducer";
import { useNavigate } from "react-router-dom";
import { ACTIONS, SERVER } from "../data/actions";

const initialState = [];

// Create context
export const JournalContext = createContext(initialState);

export const JournalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(journalReducer, initialState);

  const navigate = useNavigate();

  const handleJournalGet = async () => {
    let response = await axiosPrivate.post(SERVER.JOURNAL_GET, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.JOURNAL_GET,
        payload: { userName: auth?.user },
      },
    });
    if (response?.data && Array.isArray(response.data)) {
      dispatch({ type: ACTIONS.JOURNAL_GET, payload: response.data });
    }
  };

  const handleJournalCreate = async (journal) => {
    dispatch({ type: ACTIONS.JOURNAL_CREATE, payload: journal });
    let response = await axiosPrivate.post(SERVER.JOURNAL_CREATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.JOURNAL_CREATE,
        payload: { userName: auth?.user, journal },
      },
    });
  };

  const handleJournalUpdate = async (journal) => {
    dispatch({
      type: ACTIONS.JOURNAL_UPDATE,
      payload: journal,
    });
    let response = await axiosPrivate.post(SERVER.JOURNAL_UPDATE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.JOURNAL_UPDATE,
        payload: {
          userName: auth?.user,
          journal,
        },
      },
    });
  };

  const handleJournalDelete = async (journal) => {
    dispatch({
      type: ACTIONS.JOURNAL_DELETE,
      payload: journal.id,
    });
    let response = await axiosPrivate.post(SERVER.JOURNAL_DELETE, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.JOURNAL_DELETE,
        payload: {
          userName: auth?.user,
          journal,
        },
      },
    });
  };

  useEffect(() => {
    if (auth?.user) {
      handleJournalGet();
    }
  }, []);

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
