import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import SelectField from "../components/SelectField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListContext } from "@/context/ListState";

export default function FormSelectList({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const { userLists, pinnedLists } = useContext(ListContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const listID = searchParams.get("listID") ?? null;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    navigate(`/tasks/planner?listID=${selectedList}`);

    setShow(false);
  };

  const [selectedList, setSelectedList] = useState(listID ?? "");

  const listOptions = [...pinnedLists, ...userLists].map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <FormContainer
      title="Select List"
      onSubmit={onSubmit}
      showForm={show}
      setShowForm={setShow}
    >
      <SelectField
        label="Select List"
        onValueChange={(val) => setSelectedList(val)}
        options={listOptions}
        value={selectedList}
      />
    </FormContainer>
  );
}
