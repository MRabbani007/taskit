import { Badge, Calendar, Col, Radio, Row, Select, Typography } from "antd";
import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

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

function formatDate(date, format = "dd/mm/yyyy") {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

export default function CalendarPage() {
  const { overdueTasks, handleOpen } = useContext(GlobalContext);

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const getListData = (value) => {
    const dayTasks = overdueTasks.filter(
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

  const getMonthData = (value) => {
    const dayTasks = overdueTasks.filter(
      (task) =>
        formatDate(new Date(task.dueDate), "mm/yyyy") ===
        formatDate(new Date(value), "mm/yyyy")
    );
    return dayTasks.length;
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Tasks</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} onClick={() => handleOpen(item.listID)}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        cellRender={cellRender}
        className="max-w-[1000px]"
        fullscreen={true}
        onPanelChange={onPanelChange}
      ></Calendar>
    </div>
  );
}
