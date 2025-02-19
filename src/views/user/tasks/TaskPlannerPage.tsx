import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import PlannerTab from "../../../features/planner/PlannerTab";
import { BiFilter } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/features/components/PageHeader";
import FormSelectList from "@/features/planner/FormSelectList";
import { FaTimeline } from "react-icons/fa6";
import { PiKanbanLight } from "react-icons/pi";

export const tabs: Partial<PlannerTab>[] = [
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

// const filterTasks = (type, payload, lists = []) => {
//   if (!Array.isArray(payload)) return [];
//   // remove items included in filter and keep others
//   let result = payload;
//   if (type.includes("completed")) {
//     result = result.filter((item) => item.completed === false);
//   }
//   if (type.includes("priority_low")) {
//     result = result.filter((item) => item.priority !== "low");
//   }
//   if (type.includes("priority_normal")) {
//     result = result.filter((item) => item.priority !== "normal");
//   }
//   if (type.includes("priority_high")) {
//     result = result.filter((item) => item.priority !== "high");
//   }
//   if (type.includes("inLists")) {
//     result = result.filter((item) => lists.includes(item.listID));
//   }
//   return result;
// };

export default function TaskPlannerPage() {
  const { tasks, handleGetTasks, handleMoveTaskPlanner } =
    useContext(TaskContext);

  const [searchParams] = useSearchParams();
  const listID = searchParams.get("listID") ?? null;

  const [showSelectList, setShowSelectList] = useState(false);

  const [block, setBlock] = useState(false);

  // const dragItem = useRef<HTMLDivElement>(null);
  // const dragOverItem = useRef<HTMLDivElement>(null);

  const [dragItem, setDragItem] = useState<DragItem | null>(null);
  const [dragOverItem, setDragOverItem] = useState<DragOverItem | null>(null);

  const dragStart = ({ type = null, id = null, index = null }) => {
    setDragItem({ type, id, index });
  };

  const dragEnter = ({
    type = "",
    id = null,
    value,
    index,
    length,
  }: PlannerTab) => {
    setDragOverItem({ type, id, index, value, length });
  };

  const dragEnd = () => {
    if (
      dragItem?.index === null ||
      dragItem?.index === undefined ||
      dragOverItem?.index === null ||
      dragOverItem?.index === undefined
    ) {
      setDragItem(null);
      setDragOverItem(null);
      return null;
    }

    if (block) {
      setBlock(false);
      return null;
    }

    const moveItem: MoveItem = tasks.find((item) => item?.id === dragItem?.id);
    const moveToItem: MoveItem = tasks.find(
      (item) => item?.id === dragOverItem?.id
    );

    const moveType =
      dragOverItem?.type === "tab"
        ? "tab"
        : dragOverItem?.type === "task"
        ? "task"
        : "";

    if (moveItem && moveType === "tab") {
      moveItem.status = dragOverItem?.value;
      moveItem.plannerSortIndex = dragOverItem?.length as number;
    } else if (moveItem && moveType === "task") {
      moveItem.status = moveToItem?.status ?? "";
      moveItem.plannerSortIndex = moveToItem?.plannerSortIndex ?? 0;
    }
    handleMoveTaskPlanner({
      moveType,
      moveItem: moveItem as Task,
    });

    setDragItem(null);
    setDragOverItem(null);
  };

  // const dragReset = () => {
  //   setBlock(true);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  // };

  useEffect(() => {
    if (listID?.trim()) {
      handleGetTasks({ type: "LIST", listID, comp: true, ipp: 100 });
    }
  }, [listID]);

  return (
    <main className="">
      <PageHeader
        className=""
        pageTitle="Planner"
        icon={<PiKanbanLight size={25} />}
      >
        <button
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          onClick={() => setShowSelectList(true)}
        >
          <BiFilter size={25} />
        </button>
      </PageHeader>

      <div className="flex items-stretch flex-wrap lg:flex-nowrap gap-2 lg:max-h-screen lg:overflow-hidden">
        {tabs.map((tab, index) => {
          const tabTasks =
            tasks && listID && listID?.trim()
              ? tasks
                  ?.filter((item) => item?.status === tab?.value)
                  .sort((a, b) =>
                    a.plannerSortIndex < b.plannerSortIndex ? 1 : -1
                  )
              : [];
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
      {listID && listID?.trim() ? null : (
        <div className="flex-1 flex justify-center items-start">
          <button
            className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md"
            onClick={() => setShowSelectList(true)}
          >
            Select list
          </button>
        </div>
      )}
      {showSelectList && (
        <FormSelectList show={showSelectList} setShow={setShowSelectList} />
      )}
    </main>
  );
}
