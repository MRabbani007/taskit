import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TaskContext } from "../../context/TaskState";
import { message } from "antd";
import { T_TASK } from "@/lib/templates";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";

export default function FormTaskAdd({
  listID = "",
  add,
  setAdd,
}: {
  listID: string;
  add: boolean;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleAddTask } = useContext(TaskContext);

  const [state, setState] = useState(T_TASK);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (state?.title === "") {
      message.info("Enter new task");
      return;
    } else {
      handleAddTask({ ...state, id: crypto.randomUUID(), listID });
      message.success("Task created");
    }
  };

  return (
    <FormContainer
      title="Add Task"
      showForm={add}
      setShowForm={setAdd}
      onSubmit={onSubmit}
    >
      <InputField
        label="Task"
        name="title"
        type="text"
        value={state.title}
        onChange={handleChange}
      />
      <InputField
        label="Detail"
        name="details"
        type="text"
        value={state.details}
        onChange={handleChange}
      />
    </FormContainer>
  );
}
