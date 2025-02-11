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

  console.log(state);
  console.log(state?.onDate.toISOString().split("T")[0]);
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleJournalCreate({ ...state, id: crypto.randomUUID() });
    toast.success("Item added");
  };

  return (
    <FormContainer
      title="Add Journal Item"
      showForm={add}
      setShowForm={setAdd}
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
        name="detail"
        type="text"
        value={state.detail}
        onChange={handleChange}
      />
      <InputField
        label="On Date"
        name="onDate"
        type="date"
        value={state?.onDate.toISOString().split("T")[0]}
        onChange={handleChange}
      />
    </FormContainer>
  );
}
