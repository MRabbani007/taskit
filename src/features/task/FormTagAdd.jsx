import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { FaCirclePlus } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

export default function FormTagAdd({ task = {}, setAddTag }) {
  const { tags, handleCreateTag, handleUpdateTag, handleDeleteTag } =
    useContext(GlobalContext);

  const [taskTags, setTaskTags] = useState(() => {
    return tags.filter((tag) => tag.taskID === task.id);
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setTaskTags(() => {
      return tags.filter((tag) => tag.taskID === task.id);
    });
  }, [tags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tag = {
      id: crypto.randomUUID(),
      name: tagInput,
      taskID: task.id,
      listID: task.listID,
    };
    handleCreateTag(tag);
    setAddTag(false);
  };

  const handleReset = () => {
    setAddTag(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex items-center gap-1"
      >
        <input
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          placeholder="New Tag"
          className="border-none outline-none p-0 m-0 bg-transparent"
        />
        <button type="submit">
          <CiSquareCheck className="icon" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon" />
        </button>
      </form>
    </div>
  );
}
