import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import { FaCircleDot, FaTimeline } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import PlannerTab from "../../../features/planner/PlannerTab";
import TaskFilter from "../../../features/task/TaskFilter";
import { BiFilter } from "react-icons/bi";

export const tabs = [
  {
    id: 1,
    title: "Tasks",
    value: "open",
    type: "task",
    className: "bg-zinc-500 text-white",
  },
  {
    id: 2,
    title: "Planned",
    value: "planned",
    type: "task",
    className: "bg-yellow-500 text-white",
  },
  {
    id: 3,
    title: "Started",
    value: "started",
    type: "task",
    className: "bg-blue-600 text-white",
  },
  {
    id: 4,
    title: "Completed",
    value: "completed",
    type: "task",
    className: "bg-green-600 text-white",
  },
  {
    id: 5,
    title: "Canceled",
    value: "canceled",
    type: "task",
    className: "bg-red-600 text-white",
  },
];

const filterTasks = (type, payload, lists = []) => {
  if (!Array.isArray(payload)) return [];
  // remove items included in filter and keep others
  let result = payload;
  if (type.includes("completed")) {
    result = result.filter((item) => item.completed === false);
  }
  if (type.includes("priority_low")) {
    result = result.filter((item) => item.priority !== "low");
  }
  if (type.includes("priority_normal")) {
    result = result.filter((item) => item.priority !== "normal");
  }
  if (type.includes("priority_high")) {
    result = result.filter((item) => item.priority !== "high");
  }
  if (type.includes("inLists")) {
    result = result.filter((item) => lists.includes(item.listID));
  }
  return result;
};

export default function TaskPlannerPage() {
  const {
    tasks,
    status,
    handleGetTasks,
    handleMoveTaskPlanner,
    filters,
    setFilters,
  } = useContext(TaskContext);

  const [block, setBlock] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = ({ type = null, id = null, index = null }) => {
    dragItem.current = { type, id, index };
  };
  const dragEnter = ({
    type = null,
    id = null,
    value,
    index = null,
    length,
  }) => {
    // console.log();
    dragOverItem.current = { type, id, index, value, length };
  };
  const dragEnd = () => {
    if (
      dragItem.current?.index === null ||
      dragItem.current?.index === undefined ||
      dragOverItem.current?.index === null ||
      dragOverItem.current?.index === undefined
    ) {
      dragItem.current = null;
      dragOverItem.current = null;
      return null;
    }

    if (block) {
      setBlock(false);
      return null;
    }

    const moveItem = tasks.find((item) => item?.id === dragItem.current?.id);
    const moveToItem = tasks.find(
      (item) => item?.id === dragOverItem.current?.id
    );

    const moveType =
      dragOverItem.current?.type === "tab"
        ? "tab"
        : dragOverItem.current?.type === "task"
        ? "task"
        : null;

    if (moveType === "tab") {
      moveItem.status = dragOverItem.current?.value;
      moveItem.plannerSortIndex = dragOverItem.current?.length;
    } else if (moveType === "task") {
      moveItem.status = moveToItem.status;
      moveItem.plannerSortIndex = moveToItem.plannerSortIndex;
    }
    handleMoveTaskPlanner({
      moveType,
      moveItem,
    });

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const dragReset = () => {
    setBlock(true);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => {
    handleGetTasks("ALL");
  }, []);

  return (
    <main>
      <header>
        <FaTimeline size={40} />
        <h1 className="flex-1">Planner</h1>
        <div>
          <button
            onClick={() =>
              setFilters((curr) => ({ ...curr, viewFilter: true }))
            }
          >
            <BiFilter size={30} />
          </button>
        </div>
      </header>
      <div className="flex items-stretch flex-wrap lg:flex-nowrap gap-2 max-h-screen overflow-hidden">
        {tabs.map((tab, index) => {
          const tabTasks = tasks
            ?.filter((item) => item?.status === tab?.value)
            .sort((a, b) => (a.plannerSortIndex < b.plannerSortIndex ? 1 : -1));
          return (
            <PlannerTab
              tab={tab}
              index={index}
              key={index}
              tasks={tabTasks}
              onDragStart={dragStart}
              onDragEnter={dragEnter}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
      {filters?.viewFilter ? <TaskFilter /> : null}
    </main>
  );
}
