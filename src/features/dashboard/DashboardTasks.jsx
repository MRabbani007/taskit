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
    <article className="bg-stone-100 rounded-lg p-4 flex flex-col gap-4">
      <Link to="/tasks" title="Go to Tasks">
        <h2 className="">Tasks</h2>
      </Link>
      <div className="flex items-center justify-center gap-4 ">
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
      <div className="flex items-stretch gap-2 font-medium">
        {tasks.map((item, index) => {
          return (
            <Link
              to={item.url}
              title={item.title}
              key={index}
              className="flex-1 text-center"
            >
              <p className="bg-blue-200 py-1 px-2 rounded-t-lg whitespace-nowrap">
                {item.name}
              </p>
              <p className="py-1 px-2 bg-zinc-200 rounded-b-lg">{item.qty}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
