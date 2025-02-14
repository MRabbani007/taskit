import { FormEvent, useContext, useEffect, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import PlannerTab from "../../../features/planner/PlannerTab";
import TaskFilter from "../../../features/task/TaskFilter";
import { BiCheck, BiFilter } from "react-icons/bi";
import { ListContext } from "@/context/ListState";
import SelectField from "@/features/components/SelectField";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/features/components/PageHeader";

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
  const { userLists, pinnedLists } = useContext(ListContext);
  const { tasks, handleGetTasks, handleMoveTaskPlanner, filters, setFilters } =
    useContext(TaskContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const listID = searchParams.get("listID") ?? null;

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

  const [selectedList, setSelectedList] = useState(listID ?? "");

  const listOptions = [...pinnedLists, ...userLists].map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    navigate(`/tasks/planner?listID=${selectedList}`);
  };

  useEffect(() => {
    if (listID?.trim()) {
      handleGetTasks({ type: "LIST", listID, comp: true, ipp: 100 });
    }
  }, [listID]);

  return (
    <main className="">
      <PageHeader className="">
        <h1 className="flex-1">Planner</h1>
        <div>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() =>
              setFilters((curr) => ({ ...curr, viewFilter: true }))
            }
          >
            <BiFilter size={30} />
          </button>
        </div>
      </PageHeader>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <SelectField
          label="List"
          onValueChange={(val) => setSelectedList(val)}
          options={listOptions}
          value={selectedList}
        />
        <button className="p-1 bg-zinc-200 rounded-md">
          <BiCheck size={25} />
        </button>
      </form>
      <div className="flex items-stretch flex-wrap lg:flex-nowrap gap-2 lg:max-h-screen lg:overflow-hidden">
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
