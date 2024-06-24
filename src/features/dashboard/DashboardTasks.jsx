import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import { TaskContext } from "../../context/TaskState";
// AntD
import { Button, Progress } from "antd";

export default function DashboardTasks() {
  const { tasksSummary } = useContext(TaskContext);

  const tasks = [
    {
      name: "Today",
      title: "Show tasks for today",
      qty: tasksSummary?.today || 0,
      url: "/tasks/today",
    },
    {
      name: "Week",
      title: "Show tasks for this week",
      qty: tasksSummary?.week || 0,
      url: "/tasks/week",
    },
    {
      name: "Important",
      title: "Show important tasks",
      qty: tasksSummary?.important || 0,
      url: "/tasks/important",
    },
    {
      name: "Over Due",
      title: "Show overdue tasks",
      qty: tasksSummary?.overdue || 0,
      url: "/tasks/overdue",
    },
  ];

  return (
    <article className="flex-1 min-w-[300px]">
      <h2 className="py-2 px-4 bg-gradient-to-l from-sky-200 to-sky-50 text-zinc-800">
        <Link
          to="/tasks"
          title="Go to Tasks"
          className="hover:text-yellow-500 duration-200"
        >
          Tasks
        </Link>
      </h2>
      <div className="flex gap-4 items-center justify-evenly p-4">
        <Progress
          type="dashboard"
          steps={10}
          percent={Math.floor(
            ((tasksSummary?.completed || 0) / (tasksSummary?.total || 1)) * 100
          )}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
        <div className="font-semibold">
          <p className="text-orange-500">{`${
            tasksSummary?.pending || 0
          } open`}</p>
          <p className="text-green-500">{`${
            tasksSummary?.completed || 0
          } completed`}</p>
          <p className="text-sky-500">{`${tasksSummary?.total || 0} tasks`}</p>
        </div>
      </div>
      <div className="flex gap-2 py-2 text-zinc-800 font-medium">
        {tasks.map((item, index) => {
          return (
            <Link
              to={item.url}
              title={item.title}
              key={index}
              className=" hover:bg-zinc-200 duration-200 flex flex-col items-stretch justify-evenly flex-1 text-center"
            >
              <p className="bg-blue-500 text-white py-1 px-2 w-full">
                {item.name}
              </p>
              <p className="py-1 px-2 bg-zinc-200">{item.qty}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
