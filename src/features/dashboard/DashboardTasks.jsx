import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

export default function DashboardTasks() {
  const { todayTasks, weekTasks, importantTasks, overdueTasks } =
    useContext(GlobalContext);

  const tasks = [
    {
      name: "Today",
      title: "Show tasks for today",
      qty: todayTasks?.length || 0,
      url: "/tasks/today",
    },
    {
      name: "Week",
      title: "Show tasks for this week",
      qty: weekTasks?.length || 0,
      url: "/tasks/week",
    },
    {
      name: "Important",
      title: "Show important tasks",
      qty: importantTasks?.length || 0,
      url: "/tasks/important",
    },
    {
      name: "Over Due",
      title: "Show overdue tasks",
      qty: overdueTasks?.length || 0,
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
      <div className="flex gap-2 py-2 text-zinc-800 font-medium">
        {tasks.map((item, index) => {
          return (
            <Link
              to={item.url}
              title={item.title}
              key={index}
              className="bg-zinc-100 hover:bg-zinc-200 duration-200 py-1 px-2 flex flex-col items-center justify-evenly w-[45%] md:w-[23%] text-center"
            >
              <p>{item.name}</p>
              <p>{item.qty}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
