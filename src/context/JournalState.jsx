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
    await axiosPrivate
      .get(SERVER.JOURNAL, {
        params: { userName: auth?.user },
      })
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          dispatch({ type: ACTIONS.JOURNAL_GET, payload: response.data });
        }
      })
      .catch((e) => {});
  };

  const handleJournalCreate = async (journal) => {
    dispatch({ type: ACTIONS.JOURNAL_CREATE, payload: journal });
    await axiosPrivate
      .post(SERVER.JOURNAL, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.JOURNAL_CREATE,
          payload: { userName: auth?.user, journal },
        },
      })
      .catch((e) => {});
  };

  const handleJournalUpdate = async (journal) => {
    dispatch({
      type: ACTIONS.JOURNAL_UPDATE,
      payload: journal,
    });
    await axiosPrivate
      .patch(SERVER.JOURNAL, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.JOURNAL_UPDATE,
          payload: {
            userName: auth?.user,
            journal,
          },
        },
      })
      .catch((e) => {});
  };

  const handleJournalDelete = async (journal) => {
    dispatch({
      type: ACTIONS.JOURNAL_DELETE,
      payload: journal.id,
    });
    await axiosPrivate
      .post(SERVER.JOURNAL, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.JOURNAL_DELETE,
          payload: {
            userName: auth?.user,
            journal,
          },
        },
      })
      .catch((e) => {});
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
