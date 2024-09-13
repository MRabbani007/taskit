import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import { tabs } from "../../views/user/tasks/TaskPlannerPage";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const bgColorObj = {
  1: "#0284c7",
  2: "#16a34a",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

export default function PlannerTask({
  task,
  index,
  isDraggable = false,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) {
  const { tasks, handleMoveTaskPlanner } = useContext(TaskContext);

  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const [info, setInfo] = useState(null);

  const handleMove = (type) => {
    const length = tasks.reduce((acc, curr) => {
      if (curr?.status === type) {
        acc++;
      }
      return acc;
    }, 0);
    const moveItem = { ...task, status: type, plannerSortIndex: length };
    handleMoveTaskPlanner({ moveType: "tab", moveItem });
  };

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart({ id: task.id, type: "task", index });
  };
  const handleDragEnter = () => {
    onDragEnter({ id: task.id, type: "task", index });
    setIsOver(true);
  };
  const handleDragLeave = () => {
    setIsOver(false);
  };
  const handleDragEnd = () => {
    onDragEnd();
    setIsDragging(false);
    setIsOver(false);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      className={
        (task?.completed === true ? "bg-green-300" : "") +
        " rounded-md bg-zinc-200 flex items-stretch group relative"
      }
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderWidth: isOver ? "2px" : "0px",
        borderColor: isOver ? "grey" : "",
        cursor: "move",
      }}
    >
      <div
        className="w-[10px] min-h-full rounded-l-md"
        style={{
          backgroundColor: bgColorObj[task.priorityLevel],
        }}
      ></div>
      <div className=" py-2 px-2 font-medium text-zinc-800">
        <p>{task?.title}</p>
        <p className="flex items-center gap-2 invisible h-0 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover:h-auto duration-150">
          {tabs.map((item, index) => (
            <button
              key={index}
              title={item.value}
              onClick={() => handleMove(item.value)}
              className="uppercase w-6 h-6 text-center rounded-full border-[1px]"
            >
              {item.value.substring(0, 1)}
            </button>
          ))}
        </p>
      </div>
      <button
        className="absolute top-1 right-1 invisible group-hover:visible"
        onClick={() => setInfo(true)}
      >
        <InfoCircleOutlined />
      </button>
      {/* <Modal open={info} onOk={() => setInfo(false)}>
        Task Details
        <p>{task?.title}</p>
        <p>{task?.details}</p>
      </Modal> */}
    </div>
  );
}
