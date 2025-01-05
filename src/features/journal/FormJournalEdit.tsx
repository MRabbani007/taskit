import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { JournalContext } from "../../context/JournalState";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";
import { T_JOURNAL } from "@/lib/templates";

export default function FormJournalEdit({
  journalItem,
  edit,
  setEdit,
}: {
  journalItem: JournalItem;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleJournalUpdate } = useContext(JournalContext);

  const [state, setState] = useState({ ...T_JOURNAL, ...journalItem });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleJournalUpdate(state);
    toast.success("Item created");
    setEdit(false);
  };

  return (
    <FormContainer
      title="Update Journal Item"
      showForm={edit}
      setShowForm={setEdit}
      onSubmit={onSubmit}
    >
      <InputField
        label="Activity"
        name="title"
        type="text"
        value={state.title}
        onChange={handleChange}
      />
      <InputField
        label="Detail"
        name="details"
        type="text"
        value={state.detail}
        onChange={handleChange}
      />
    </FormContainer>
  );
}
