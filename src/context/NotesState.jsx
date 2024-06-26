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
import { message } from "antd";

const initialState = [];

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);

  const handleNotesGetUser = async () => {
    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: {},
    });
    await axiosPrivate
      .get(SERVER.NOTES, {}, config)
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
    let response = await axiosPrivate.post(SERVER.NOTES, { newNote }, config);
  };

  const handleNoteUpdate = async (noteIdx, newNote) => {
    dispatch({
      type: ACTIONS.NOTES_UPDATE,
      payload: { noteIdx, newNote },
    });
    let response = await axiosPrivate.patch(SERVER.NOTES, { newNote }, config);
  };

  const handleNoteDelete = async (id) => {
    dispatch({ type: ACTIONS.NOTES_REMOVE, payload: id });
    let response = await axiosPrivate.delete(
      SERVER.NOTES,
      { data: { id } },
      config
    );
  };

  const handleNotesSort = async (newNotes) => {
    const notes = newNotes.map((item, index) => {
      return { ...item, sortIndex: index };
    });
    const type = "NOTE_SORT";
    dispatch({ type, payload: notes });
    const temp = newNotes.map((item, index) => {
      return { id: item.id, sortIndex: index };
    });
    // await axiosPrivate
    //   .patch("/notes/sort", {
    //     roles: auth?.roles,
    //     action: {
    //       type: "NOTE_SORT",
    //       payload: {
    //         userName: auth?.user,
    //         notes: temp,
    //       },
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 204) message.success("Sort Saved");
    //   })
    //   .catch((e) => message.error("Error saving sort"));
  };

  useEffect(() => {
    setNotes(() => state.filter((item) => item?.trash !== true));
    setTrash(() => state.filter((item) => item?.trash === true));
  }, [state]);

  useEffect(() => {
    if (auth?.user) {
      handleNotesGetUser();
    }
  }, [auth?.user]);

  return (
    <NotesContext.Provider
      value={{
        notes: notes,
        trash: trash,
        status,
        handleNoteCreate,
        handleNoteUpdate,
        handleNoteDelete,
        handleNotesSort,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
