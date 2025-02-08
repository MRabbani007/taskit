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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddLink, MdOutlineLinkOff } from "react-icons/md";

const priorityObj = {
  1: "low",
  2: "normal",
  3: "medium",
  4: "important",
  5: "high",
};

const bgColorObj = {
  1: "#0284c7",
  2: "#16a34a",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

const taskColors = [
  "bg-red-600",
  "bg-sky-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-orange-600",
  "bg-zinc-600",
];

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
  const [priorityLevel, setPriorityLevel] = useState(task?.priorityLevel || 1);

  const [addLink, setAddLink] = useState(false);

  const bgColor = bgColorObj[priorityLevel as keyof typeof bgColorObj];

  const handleUp = () => {
    setPriorityLevel((curr) => (curr < 5 ? curr + 1 : 5));
  };

  const handleDown = () => {
    setPriorityLevel((curr) => (curr > 1 ? curr - 1 : 1));
  };

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
    await handleUpdateTask({
      ...state,
      priority: priorityObj[priorityLevel as keyof typeof priorityObj],
      priorityLevel,
    });
    setEdit(false);
  };

  const handleClearLink = () => {
    if (state?.link === "" && state?.linkText === "") {
      setAddLink(false);
    } else if (confirm("Are you sure you want to remove this link?")) {
      setState((curr) => ({ ...curr, link: "", linkText: "" }));
      setAddLink(false);
    }
  };

  return (
    <FormContainer
      title="Update Task"
      submitButton="Save"
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
      <div className="flex items-start gap-4 md:gap-8 flex-wrap">
        <div>
          <p className="px-2 font-medium">Priority</p>
          <div
            className={
              "flex items-center justify-center gap-4 w-[200px] rounded-md text-white py-1 px-2"
            }
            style={{ backgroundColor: bgColor }}
            title={"Priority " + state?.priority}
          >
            <button
              type="button"
              onClick={handleDown}
              className="p-1 hover:bg-white/20 rounded-md"
            >
              <IoIosArrowBack size={20} />
            </button>
            <span className="font-medium">
              {priorityObj[priorityLevel as keyof typeof priorityObj]}
            </span>
            <button
              type="button"
              onClick={handleUp}
              className="p-1 hover:bg-white/20 rounded-md"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div>
          <p className="px-2 font-medium">Color</p>
          <div className="flex items-center gap-2">
            {taskColors.map((item) => (
              <div
                key={item}
                className={
                  (state?.color === item
                    ? " border-[2px] border-yellow-300 "
                    : "") +
                  " w-8 h-8 rounded-md hover:shadow-md hover:shadow-zinc-500 duration-200 inline-block " +
                  item
                }
                onClick={() => setState((curr) => ({ ...curr, color: item }))}
              >
                {/* <label htmlFor={item}>
              <input
                type="radio"
                name="color"
                id={item}
                value={item}
                title="item"
                // onChange={() => setState((curr) => ({ ...curr, color: item }))}
                // className="invisible"
              />
            </label> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <InputField
        label="Due Date"
        name="dueDate"
        type="date"
        value={state?.dueDate.toLocaleString().substring(0, 10)}
        onChange={handleChange}
      />
      <div>
        {!addLink ? (
          <button
            type="button"
            title={"Add Link"}
            onClick={() => setAddLink(true)}
            className="p-2 rounded-md bg-zinc-200"
          >
            <MdOutlineAddLink size={20} />
          </button>
        ) : (
          <button
            className="p-2 rounded-md bg-zinc-200"
            type="button"
            title={"Remove Link"}
            onClick={handleClearLink}
          >
            <MdOutlineLinkOff size={20} />
          </button>
        )}
      </div>

      {addLink && (
        <>
          <InputField
            label="Link URL"
            name="link"
            type="text"
            value={state.link}
            onChange={handleChange}
          />
          <InputField
            label="Link Display Text"
            name="linkText"
            type="text"
            value={state.linkText}
            onChange={handleChange}
          />
        </>
      )}
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
