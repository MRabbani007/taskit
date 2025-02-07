import { Form, Input, Modal } from "antd";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ListContext } from "../../context/ListState";
import { T_TASKLIST } from "@/lib/templates";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";

export default function FormTaskListEdit({
  edit,
  setEdit,
  taskList,
}: {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  taskList: TaskList;
}) {
  const { handleUpdateList } = useContext(ListContext);

  const [state, setState] = useState({ ...T_TASKLIST, ...taskList });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await handleUpdateList(state);

    console.log(response);

    setEdit(false);
  };

  return (
    <FormContainer
      title="Edit List"
      submitButton="Save"
      showForm={edit}
      setShowForm={setEdit}
      onSubmit={handleSubmit}
    >
      <InputField
        label="List Title"
        name="title"
        type="text"
        value={state?.title}
        onChange={handleChange}
      />
      <InputField
        label="Subtitle"
        name="subTitle"
        type="text"
        value={state?.subTitle}
        onChange={handleChange}
      />
      <InputField
        label="Detail"
        name="detail"
        type="text"
        value={state?.detail}
        onChange={handleChange}
      />
    </FormContainer>
  );
}
