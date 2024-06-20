import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { notesReducer } from "./NotesReducer";
import { ACTIONS, SERVER } from "../data/actions";

const initialState = [];

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [status, setStatus] = useState(initialStatus);

  const handleNotesGetUser = async () => {
    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: {},
    });
    await axiosPrivate
      .get(SERVER.NOTES, {
        params: {
          userName: auth?.user,
        },
      })
      .then((response) => {
        if (response?.data && Array.isArray(response.data)) {
          dispatch({ type: ACTIONS.NOTES_GET_USER, payload: response.data });
          setStatus({
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: {},
          });
        }
      })
      .catch((err) =>
        setStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: {},
        })
      );
  };

  const handleNoteCreate = async (title = "") => {
    let newNote = {
      id: crypto.randomUUID(),
      title,
      details: "",
      priority: "normal",
      tags: [],
      trash: false,
    };
    dispatch({ type: ACTIONS.NOTES_CREATE, payload: newNote });
    let response = await axiosPrivate.post(SERVER.NOTES, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_CREATE,
        payload: { userName: auth?.user, newNote },
      },
    });
  };

  const handleNoteUpdate = async (noteIdx, newNote) => {
    dispatch({
      type: ACTIONS.NOTES_UPDATE,
      payload: { noteIdx, newNote },
    });
    let response = await axiosPrivate.patch(SERVER.NOTES, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.NOTES_UPDATE,
        payload: {
          userName: auth?.user,
          newNote,
        },
      },
    });
  };

  const handleNoteDelete = async (noteID) => {
    dispatch({ type: ACTIONS.NOTES_REMOVE, payload: noteID });
    let response = await axiosPrivate.delete(SERVER.NOTES, {
      data: {
        roles: auth?.roles,
        action: {
          type: ACTIONS.NOTES_REMOVE,
          payload: { userName: auth?.user, noteID },
        },
      },
    });
  };

  useEffect(() => {
    if (auth?.user) {
      handleNotesGetUser();
    }
  }, [auth?.user]);

  return (
    <NotesContext.Provider
      value={{
        notes: state,
        status,
        handleNoteCreate,
        handleNoteUpdate,
        handleNoteDelete,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
