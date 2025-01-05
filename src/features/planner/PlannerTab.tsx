import { useState } from "react";
import PlannerTask from "./PlannerTask";

// const bgColorObj = {
//   1: "#0284c7",
//   2: "#16a34a",
//   3: "#eab308",
//   4: "#f97316",
//   5: "#dc2626",
// };

export default function PlannerTab({
  tab = { id: null, title: "", value: "", className: "", type: "task" },
  index = null,
  tasks = [],
  onDragStart,
  onDragEnter,
  onDragEnd,
}: {
  tab: Partial<PlannerTab>;
  index: number | null;
  tasks: Task[];
  onDragStart: (params: any) => void;
  onDragEnter: (params: any) => void;
  onDragEnd: (params?: any) => void;
}) {
  // const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  // const handleDragStart = () => {
  //   setIsDragging(true);
  //   onDragStart({ id: tab.id, type: "tab", value: tab?.value, index: idx });
  // };

  const handleDragEnter = () => {
    onDragEnter({
      id: tab.id,
      type: "tab",
      value: tab?.value,
      index: index,
      length: tasks.length,
    });
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  // const handleDragEnd = () => {
  //   onDragEnd();
  //   setIsDragging(false);
  //   setIsOver(false);
  // };

  return (
    <div className="flex-1 rounded bg-zinc-50 flex flex-col">
      <div
        onDragEnter={onDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={
          "rounded text-center py-2 px-4 font-semibold " + tab.className
        }
      >
        {tab?.title}
      </div>
      <div className="overflow-y-auto flex-1">
        <div
          className="flex flex-col gap-2 p-2 border-2 "
          style={{
            borderWidth: isOver ? "2px" : "0px",
            borderColor: isOver ? "grey" : "",
          }}
        >
          {tasks.map((task, idx) => {
            return (
              <PlannerTask
                key={idx}
                index={idx}
                task={task}
                isDraggable={true}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
