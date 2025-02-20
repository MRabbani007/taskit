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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  MdOutlineAddLink,
  MdOutlineLinkOff,
  MdOutlineMoreHoriz,
  MdOutlineNotes,
  MdOutlineTitle,
} from "react-icons/md";
import TextAreaField from "../components/TextAreaField";
import toast from "react-hot-toast";

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
  "",
  "bg-zinc-600",
  "bg-sky-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-orange-600",
  "bg-red-600",
];

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
  const [priorityLevel, setPriorityLevel] = useState(T_TASK?.priorityLevel);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (state?.title + state?.task + state?.details === "") {
      message.info("Enter new task");
      return;
    } else {
      handleAddTask({ ...state, id: crypto.randomUUID(), listID });
      toast.success("Task created");
    }
  };

  const [showTitle, setShowTitle] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  const [addLink, setAddLink] = useState(false);

  const bgColor = bgColorObj[priorityLevel as keyof typeof bgColorObj];

  const handleUp = () => {
    setPriorityLevel((curr) => (curr < 5 ? curr + 1 : 5));
  };

  const handleDown = () => {
    setPriorityLevel((curr) => (curr > 1 ? curr - 1 : 1));
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
      title="Add Task"
      showForm={add}
      setShowForm={setAdd}
      onSubmit={onSubmit}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Task Title"
          onClick={() => setShowTitle((curr) => !curr)}
          className={
            (showTitle
              ? "bg-green-500/60 hover:bg-green-600"
              : "bg-zinc-200 hover:bg-zinc-300") +
            " p-2 rounded-md  duration-200"
          }
        >
          <MdOutlineTitle size={20} />
        </button>
        <button
          type="button"
          title="Task Details"
          onClick={() => setShowDetails((curr) => !curr)}
          className={
            (showDetails
              ? "bg-green-500/60 hover:bg-green-600"
              : "bg-zinc-200 hover:bg-zinc-300") +
            " p-2 rounded-md  duration-200"
          }
        >
          <MdOutlineMoreHoriz size={20} />
        </button>
        <button
          type="button"
          title="Task Notes"
          onClick={() => setShowNotes((curr) => !curr)}
          className={
            (showNotes
              ? "bg-green-500/60 hover:bg-green-600"
              : "bg-zinc-200 hover:bg-zinc-300") +
            " p-2 rounded-md  duration-200"
          }
        >
          <MdOutlineNotes size={20} />
        </button>
        {!addLink ? (
          <button
            type="button"
            title={"Add Link"}
            onClick={() => setAddLink(true)}
            className="p-2 rounded-md bg-zinc-200 hover:bg-zinc-300 duration-200"
          >
            <MdOutlineAddLink size={20} />
          </button>
        ) : (
          <button
            className="p-2 rounded-md bg-zinc-200 hover:bg-zinc-300 duration-200"
            type="button"
            title={"Remove Link"}
            onClick={handleClearLink}
          >
            <MdOutlineLinkOff size={20} />
          </button>
        )}
      </div>
      {showTitle && (
        <InputField
          label="Title"
          name="title"
          type="text"
          value={state?.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
        />
      )}
      <InputField
        label="Task"
        name="task"
        type="text"
        value={state?.task ?? ""}
        onChange={handleChange}
        placeholder="Task Description"
      />
      {showDetails && (
        <TextAreaField
          label="Details"
          name="details"
          value={state?.details ?? ""}
          handleChange={handleChange}
        />
      )}
      {showNotes && (
        <InputField
          label="Notes"
          name="notes"
          type="text"
          placeholder="Note..."
          value={state?.notes ?? ""}
          onChange={handleChange}
        />
      )}
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
              ></div>
            ))}
          </div>
        </div>
        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          value={state?.dueDate.toLocaleString().substring(0, 10)}
          onChange={handleChange}
        />
      </div>
      {addLink && (
        <>
          <InputField
            label="Link URL"
            name="link"
            type="text"
            value={state?.link ?? ""}
            onChange={handleChange}
          />
          <InputField
            label="Link Display Text"
            name="linkText"
            type="text"
            value={state?.linkText ?? ""}
            onChange={handleChange}
          />
        </>
      )}
    </FormContainer>
  );
}
