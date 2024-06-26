import React, { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskState";
import { FaCircleDot, FaTimeline } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";

const tabs = [
  { title: "Tasks", className: "bg-zinc-500 text-white" },
  { title: "Planned", className: "bg-yellow-500 text-white" },
  { title: "Started", className: "bg-blue-600 text-white" },
  { title: "Completed", className: "bg-green-600 text-white" },
  { title: "Canceled", className: "bg-red-600 text-white" },
];

const bgColorObj = {
  1: "#0284c7",
  2: "#16a34a",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

export default function TaskPlannerPage() {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("ALL");
  }, []);

  return (
    <main>
      <header className="bg-gradient-to-r from-sky-800 to-sky-600 text-white shadow-md shadow-zinc-500">
        <div>
          <FaTimeline size={40} />
          <h1>Planner</h1>
        </div>
      </header>
      <div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <div key={index} className="p-2 flex-1 border-2 rounded-md">
              <div
                className={
                  "rounded-md text-center py-2 mb-2 px-4 font-semibold " +
                  tab.className
                }
              >
                {tab?.title}
              </div>
              <div className="flex flex-col gap-2">
                {tasks.slice(index * 10, (index + 1) * 10).map((task, idx) => {
                  return (
                    <div
                      key={idx}
                      className="rounded-md bg-zinc-200 flex items-stretch"
                    >
                      <span
                        className="w-[10px] min-h-full rounded-l-md"
                        style={{
                          backgroundColor: bgColorObj[task.priorityLevel],
                        }}
                      ></span>
                      <span className=" py-2 px-2 font-medium text-zinc-800">
                        {task?.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
