import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { JournalContext } from "../../context/JournalState";
import { T_JOURNAL } from "@/lib/templates";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";

export default function FormJournalAdd({
  add,
  setAdd,
}: {
  add: boolean;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleJournalCreate } = useContext(JournalContext);

  const [state, setState] = useState(T_JOURNAL);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleJournalCreate({ ...state, id: crypto.randomUUID() });
  };

  return (
    <FormContainer
      title="Add Journal Item"
      showForm={add}
      setShowForm={setAdd}
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
