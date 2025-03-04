import { ReactNode, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Context
import { TaskContext } from "../../context/TaskState";
// AntD
import { MdOutlineNextPlan, MdOutlineTaskAlt } from "react-icons/md";
import {
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import TaskDonutChart from "./TaskDonutChart";

type DashboardTasks = {
  todayTasks: Task[];
  weekTasks: Task[];
  importantTasks: Task[];
  overdueTasks: Task[];
};

export default function DashboardTasks() {
  const { config } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [state, setState] = useState<DashboardTasks | null>(null);

  const [status, setStatus] = useState<FetchStatus>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: {},
  });

  const handleGetDashboardTasks = async () => {
    try {
      setStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: {},
      });

      const response = await axiosPrivate.get("/tasks/dashboard", {
        ...config,
      });

      if (response?.data && Array.isArray(response.data)) {
        const data: DashboardTasks = response?.data[0];
        setState(data);
        setStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: {},
        });
      }
    } catch (error) {
      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: {},
      });
    } finally {
    }
  };

  useEffect(() => {
    handleGetDashboardTasks();
  }, [config]);

  const { tasksSummary, tasks } = useContext(TaskContext);

  const tasksSummaryItems = [
    {
      name: "Today",
      title: `${tasksSummary?.today} tasks for today`,
      qty: tasksSummary?.today || 0,
      url: "/tasks?filter=today",
      icon: <IoTodayOutline size={25} />,
      bg: "bg-blue-200 text-blue-600 hover:text-blue-600 hover:bg-blue-300",
    },
    {
      name: "Week",
      title: `${tasksSummary?.week} tasks for this week`,
      qty: tasksSummary?.week || 0,
      url: "/tasks?filter=week",
      icon: <BsCalendar4Week size={25} />,
      bg: "bg-green-200 text-green-600 hover:text-green-600 hover:bg-green-300",
    },
    {
      name: "Important",
      title: `${tasksSummary?.important} important tasks`,
      qty: tasksSummary?.important || 0,
      url: "/tasks?filter=important",
      icon: <IoStarOutline size={25} />,
      bg: "bg-yellow-200 text-yellow-500 hover:text-yellow-500 hover:bg-yellow-300",
    },
    {
      name: "Over Due",
      title: `${tasksSummary?.overdue} overdue tasks`,
      qty: tasksSummary?.overdue || 0,
      url: "/tasks?filter=overdue",
      icon: <IoRepeatOutline size={25} />,
      bg: "bg-red-200 text-red-500 hover:text-red-500 hover:bg-red-300",
    },
  ];

  const plannerTasks = [
    {
      title: "Upcoming",
      bg: "bg-yellow-600 hover:bg-yellow-800/70",
      count: 2,
      icon: <MdOutlineNextPlan size={25} />,
    },
    {
      title: "In Progress",
      bg: "bg-blue-600 hover:bg-blue-600/70",
      count: 4,
      icon: <TbProgressHelp size={25} />,
    },
    {
      title: "Completed",
      bg: "bg-green-600 hover:bg-green-600/70",
      count: 10,
      icon: <TbProgressCheck size={25} />,
    },
    {
      title: "Canceled",
      bg: "bg-red-600 hover:bg-red-600/70",
      count: 1,
      icon: <TbProgressX size={25} />,
    },
  ];

  return (
    <article className=" border-[px] border-zinc-400 bg-gray-50 rounded-xl">
      <Link to="/tasks" title="Go to Tasks">
        <h2 className="flex items-center gap-2 py-4 px-4 font-normal text-sky-800">
          <MdOutlineTaskAlt size={25} />
          My Tasks
        </h2>
      </Link>
      <TaskDonutChart />
      <RenderBlock
        title="Today"
        icon={<IoTodayOutline size={25} />}
        count={tasksSummary?.today ?? 0}
        url="/tasks?filter=today"
        tasks={Array.isArray(state?.todayTasks) ? state.todayTasks : []}
      />
      <RenderBlock
        title="This Week"
        icon={<BsCalendar4Week size={25} />}
        count={tasksSummary?.week ?? 0}
        url="/tasks?filter=week"
        tasks={Array.isArray(state?.weekTasks) ? state.weekTasks : []}
      />
      <RenderBlock
        title="Important"
        icon={<IoStarOutline size={25} />}
        count={tasksSummary?.important ?? 0}
        url="/tasks?filter=important"
        tasks={Array.isArray(state?.importantTasks) ? state.importantTasks : []}
      />
      <RenderBlock
        title="Overdue"
        icon={<IoRepeatOutline size={25} />}
        count={tasksSummary?.overdue ?? 0}
        url="/tasks?filter=overdue"
        tasks={Array.isArray(state?.overdueTasks) ? state.overdueTasks : []}
      />
    </article>
  );
}

function RenderBlock({
  title,
  icon,
  count,
  tasks,
  url,
}: {
  title: string;
  icon: ReactNode;
  count: number;
  tasks: Task[];
  url: string;
}) {
  if (tasks?.length === 0) return null;

  return (
    <div>
      <Link to={url} className="px-6 font-bold flex items-center gap-1">
        {icon}
        <span>{title}</span>
        <span>{count}</span>
      </Link>
      <div className="flex flex-col gap-2 p-4">
        {tasks.map((item) => (
          <RenderTask item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

function RenderTask({ item }: { item: Task }) {
  return (
    <div
      key={item.id}
      className="border-[1px] border-zinc-200 rounded-lg py-2 px-4 bg-white"
    >
      <div className="flex items-center">
        {item?.title && <p className="font-bold text-zinc-950">{item.title}</p>}
        <p className="ml-auto font-medium">
          {new Date(item?.dueDate).toUTCString().substring(0, 11)}
        </p>
      </div>
      {item?.task && <p className="text-zinc-900 text-sm">{item.task}</p>}
      {item?.details && <p className="text-xs text-zinc-700">{item.details}</p>}
    </div>
  );
}

// const render = (
//   <article className="rounded-lg flex flex-col">
//     <Link to="/tasks" title="Go to Tasks">
//       <h2 className="flex items-center gap-2 py-2 px-4 font-normal rounded-t-lg bg-sky-600 text-white">
//         <MdOutlineTaskAlt size={24} />
//         Tasks
//       </h2>
//     </Link>
//     <div className="flex flex-col md:flex-row items-stretch py-2 px-4 rounded-b-lg bg-stone-300">
//       <div className="flex flex-row flex-wrap md:flex-col items-stretch gap-2 font-medium">
//         {state.todayTasks.map((item, index) => {
//           return (
//             <Link
//               to={item.url}
//               title={item.title}
//               key={index}
//               className={" flex items-center gap-2"}
//             >
//               {/* <p className="bg-blue-200 py-1 px-2 rounded-t-lg whitespace-nowrap">
//           {item.name}
//         </p> */}
//               <div
//                 className={
//                   item.bg +
//                   " flex items-center gap-2 p-2 rounded-md duration-200"
//                 }
//               >
//                 {item.icon}
//               </div>
//               <p className="py-1 px-2">{item.qty}</p>
//             </Link>
//           );
//         })}
//       </div>
//       <div className="flex-1 flex items-center justify-center gap-4 p-2 bg-stone-300">
//         <Progress
//           type="dashboard"
//           steps={10}
//           percent={Math.floor(
//             ((tasksSummary?.completed || 0) / (tasksSummary?.total || 1)) *
//               100
//           )}
//           trailColor="rgba(0, 0, 0, 0.06)"
//           strokeWidth={20}
//         />
//         <div className="font-semibold">
//           <p className="text-orange-500">{`${
//             tasksSummary?.pending || 0
//           } open`}</p>
//           <p className="text-green-500">{`${
//             tasksSummary?.completed || 0
//           } completed`}</p>
//           <p className="text-sky-500">{`${
//             tasksSummary?.total || 0
//           } tasks`}</p>
//         </div>
//       </div>
//       <div className="flex flex-row flex-wrap md:flex-col gap-2 text-white text-sm">
//         {plannerTasks.map((item, idx) => (
//           <div
//             key={idx}
//             title={item.title}
//             className={
//               item.bg + " py-2 px-4 flex items-center gap-2 rounded-lg"
//             }
//           >
//             {item.icon}
//             <span className="whitespace-nowrap">{item.count}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </article>
// );
