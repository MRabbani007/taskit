import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { FaCirclePlus } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const CardTaskTags = ({ task = {}, addTag, setAddTag }) => {
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
      <p className="flex flex-wrap items-center gap-3">
        {Array.isArray(taskTags)
          ? taskTags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className=" flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full bg-slate-200"
                >
                  <FaTag className="icon-sm mr-1" />
                  {tag?.name}
                  <CiSquareRemove
                    onClick={() => {
                      handleDeleteTag(tag);
                    }}
                  />
                </span>
              );
            })
          : null}
      </p>
      {addTag ? (
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
      ) : (
        <p className="w-fit relative">
          <span
            onClick={() => {
              setAddTag(true);
            }}
            className="font-light italic text-zing-500 cursor-pointer"
          >
            Add Tag
          </span>
          <FaTag className="icon-sm mr-1 absolute top-0 -right-4 text-yellow-400" />
        </p>
      )}
    </div>
  );
};

export default CardTaskTags;
