import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { JournalContext } from "../../context/JournalState";
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
        label="Title"
        name="title"
        type="text"
        value={state.title}
        onChange={handleChange}
      />
      <InputField
        label="Activity"
        name="task"
        type="text"
        value={state.task}
        onChange={handleChange}
      />
      <InputField
        label="Detail"
        name="detail"
        type="text"
        value={state.detail}
        onChange={handleChange}
      />
      <InputField
        label="On Date"
        name="onDate"
        type="date"
        value={state?.onDate.toLocaleString().substring(0, 10)}
        onChange={handleChange}
      />
    </FormContainer>
  );
}
