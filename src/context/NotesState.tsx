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
import { notesReducer } from "./NotesReducer";
import { SERVER } from "../data/actions";

type NotesState = {
  notes: Note[];
  trash: Note[];
  status: FetchStatus;
  handleNoteCreate: (note: Note) => void;
  handleNoteUpdate: (note: Note) => void;
  handleNoteDelete: (id: string) => void;
  handleNotesSort: (notes: Note[]) => void;
};

const initialStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: {},
};

const initialState: NotesState = {
  notes: [],
  trash: [],
  status: initialStatus,
  handleNoteCreate: () => {},
  handleNoteUpdate: () => {},
  handleNoteDelete: () => {},
  handleNotesSort: () => {},
};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store data
  const [state, dispatch] = useReducer(notesReducer, []);

  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState<Note[]>([]);
  const [trash, setTrash] = useState<Note[]>([]);

  const handleNotesGetUser = async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: {},
      });
      const response = await axiosPrivate.get(SERVER.NOTES, config);

      if (response?.data && Array.isArray(response.data)) {
        dispatch({ type: "NOTES_GET_USER", payload: response.data });
        setStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: {},
        });
      }
    } catch (error) {
      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: {},
      });
    }
  };

  const handleNoteCreate = async (note: Note) => {
    dispatch({ type: "NOTES_CREATE", payload: note });

    await axiosPrivate.post(SERVER.NOTES, { newNote: note }, config);
  };

  const handleNoteUpdate = async (newNote: Note) => {
    dispatch({
      type: "NOTES_UPDATE",
      payload: newNote,
    });

    await axiosPrivate.patch(SERVER.NOTES, { newNote }, config);
  };

  const handleNoteDelete = async (id: string) => {
    dispatch({ type: "NOTES_REMOVE", payload: id });
    await axiosPrivate.delete(SERVER.NOTES, {
      data: { id },
      ...config,
    });
  };

  // TODO: complete server side
  const handleNotesSort = async (newNotes: Note[]) => {
    const notes = newNotes.map((item, index) => {
      return { ...item, sortIndex: index };
    });

    dispatch({ type: "NOTE_SORT", payload: notes });
    // newNotes.map((item, index) => {
    //   return { id: item.id, sortIndex: index };
    // });
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
