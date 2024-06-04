import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

export default function DashboardTasks() {
  const {todayTasks, weekTasks,importantTasks,overdueTasks} = useContext(GlobalContext)
  return (
    <article className="flex-1 min-w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
      <h2 className="border-b-2 py-2 px-4 bg-gradient-to-r from-sky-800 to-sky-600 text-white rounded-t-md">
        My Tasks
      </h2>
      <div className="flex flex-col gap-2 py-2 px-4 text-white font-medium">
        <Link to="/tasks/today" title="Show tasks for today">
          <p className="shadow-md shadow-slate-400 bg-zinc-500 hover:bg-zinc-400 duration-200 rounded-md py-1 px-2 flex items-center justify-evenly">
            <span className="w-20">Today</span>
            <span className="w-12">{todayTasks.length}</span>
          </p>
        </Link>
        <Link to="/tasks/week" title="Show tasks for this week">
          <p className="shadow-md shadow-slate-400 bg-zinc-500 hover:bg-zinc-400 duration-200 rounded-md py-1 px-2 flex items-center justify-evenly">
            <span className="w-20">This Week</span>
            <span className="w-12">{weekTasks.length}</span>
          </p>
        </Link>
        <Link to="/tasks/important" title="Show important tasks">
          <p className="shadow-md shadow-slate-400 bg-zinc-500 hover:bg-zinc-400 duration-200 rounded-md py-1 px-2 flex items-center justify-evenly">
            <span className="w-20">Important</span>
            <span className="w-12">{importantTasks.length}</span>
          </p>
        </Link>
        <Link to="/tasks/overdue" title="Show overdue tasks">
          <p className="shadow-md shadow-slate-400 bg-zinc-500 hover:bg-zinc-400 duration-200 rounded-md py-1 px-2 flex items-center justify-evenly">
            <span className="w-20">Overdue</span>
            <span className="w-12">{overdueTasks.length}</span>
          </p>
        </Link>
        <p className="shadow-md shadow-slate-400 bg-zinc-500 rounded-md py-1 px-2 flex items-center justify-evenly">
          <span>Completed</span>
          <span className="w-12">10</span>
        </p>
        {/* <p className="shadow-md shadow-slate-400 bg-yellow-400 rounded-md py-1 px-2 mt-2 flex items-center justify-evenly font-semibold">
          <span className="w-20">Total</span>
          <span className="w-12">47</span>
        </p> */}
        <Button
          type="primary"
          title="Open Notes Page"
          className="w-fit mx-auto"
        >
          <Link to="/tasks">Open Tasks</Link>
        </Button>
      </div>
    </article>
  );
}
