import React from "react";

const CardTaskList = ({ task }) => {
  let color = "";
  if (task.priority === "high") {
    color = "text-red-400";
  } else if (task.priority === "normal") {
    color = "text-yellow-300";
  } else if (task.priority === "low") {
    color = "text-green-300";
  }
  return (
    <div>
      <p
        key={index}
        className="p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
        onClick={() => handleOpen(task.listID)}
      >
        <FaCircle className={color + " icon-sm mr-2"} />
        {task.title}
      </p>
    </div>
  );
};

export default CardTaskList;
