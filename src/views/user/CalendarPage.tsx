import { useEffect, useContext } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
import { ListContext } from "../../context/ListState";
// AntD
import { Badge, Calendar } from "antd";
// Icons
import { IoCalendarOutline } from "react-icons/io5";
import PageLinks from "@/features/navigation/PageLinks";

// const getListData = (value) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         {
//           type: "warning",
//           content: "This is warning event.",
//         },
//         {
//           type: "success",
//           content: "This is usual event.",
//         },
//       ];
//       break;
//     case 10:
//       listData = [
//         {
//           type: "warning",
//           content: "This is warning event.",
//         },
//         {
//           type: "success",
//           content: "This is usual event.",
//         },
//         {
//           type: "error",
//           content: "This is error event.",
//         },
//       ];
//       break;
//     case 15:
//       listData = [
//         {
//           type: "warning",
//           content: "This is warning event",
//         },
//         {
//           type: "success",
//           content: "This is very long usual event......",
//         },
//         {
//           type: "error",
//           content: "This is error event 1.",
//         },
//         {
//           type: "error",
//           content: "This is error event 2.",
//         },
//         {
//           type: "error",
//           content: "This is error event 3.",
//         },
//         {
//           type: "error",
//           content: "This is error event 4.",
//         },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };

// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

function formatDate(date: Date, format = "dd/mm/yyyy") {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) =>
    map[matched as keyof typeof map].toString()
  );
}

export default function CalendarPage() {
  const { tasks, handleGetTasks } = useContext(TaskContext);
  const { handleOpen } = useContext(ListContext);

  useEffect(() => {
    handleGetTasks({ type: "Calendar" });
  }, []);

  const onPanelChange = () => {
    // value: any, mode: any
    // console.log(value.format("YYYY-MM-DD"), mode);
  };

  const getListData = (value: any) => {
    const dayTasks = tasks
      .filter((task) => task.completed === false)
      .filter(
        (task) =>
          formatDate(new Date(task.dueDate)) === formatDate(new Date(value))
      );

    const listData = dayTasks.map((task) => {
      return {
        type:
          task?.priority === "high"
            ? "error"
            : task?.priority === "normal"
            ? "warning"
            : "success",
        content: task?.title,
        listID: task?.listID,
      };
    });
    return listData;
  };

  const getMonthData = (value: Date) => {
    const dayTasks = tasks.filter(
      (task) =>
        formatDate(new Date(task.dueDate), "mm/yyyy") ===
        formatDate(new Date(value), "mm/yyyy")
    );
    return dayTasks.length;
  };

  const monthCellRender = (value: Date) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Tasks</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Date) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} onClick={() => handleOpen(item.listID)}>
            <Badge status={item.type as "default"} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: any, info: any) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <main className="m-0 p-0">
      <div className=" pt-4 pb-8 px-2 flex flex-col items-start rounded-xl bg-gradient-to-r from-green-600 to-green-950 shadow-md shadow-zinc-500">
        <header className="py-2 px-4 text-white gap-4">
          {/* <IoCalendarOutline size={40} /> */}
          <div className="flex-1">
            <h1 className="py-1 px-4 bg-white/20 rounded-lg w-fit">Calendar</h1>
          </div>
        </header>
        <PageLinks />
      </div>
      <Calendar
        cellRender={cellRender}
        className=""
        fullscreen={true}
        onPanelChange={onPanelChange}
      ></Calendar>
    </main>
  );
}
