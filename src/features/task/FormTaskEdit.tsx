import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TaskContext } from "../../context/TaskState";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";
import { T_TASK } from "@/lib/templates";

export default function FormTaskEdit({
  task,
  edit,
  setEdit,
}: {
  task: Task;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleUpdateTask } = useContext(TaskContext);

  const [state, setState] = useState<Task>({ ...T_TASK, ...task });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(state);
    await handleUpdateTask(state);
    setEdit(false);
  };

  return (
    <FormContainer
      title="Update Task"
      showForm={edit}
      setShowForm={setEdit}
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
      <InputField
        label="Due Date"
        name="dueDate"
        type="date"
        value={state.dueDate}
        onChange={handleChange}
      />
    </FormContainer>
  );
}

{
  /* <Select value={task?.listID}>
          <Select.Option value={"task_list"}>Select List</Select.Option>
          {lists.map((item, idx) => (
            <Select.Option value={item.id} key={idx}>
              {item.title}
            </Select.Option>
          ))}
        </Select> */
}
