import React from "react";
import {
  IoCalendarOutline,
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

export default function SidebarUserTasks() {
  const location = useLocation();

  const isActive = (page) => location.pathname.includes(page);

  return (
    <ul
      className={
        "fixed top-[50%] left-0 -translate-y-[50%] flex flex-col items-start z-10"
      }
    >
      <li className="group">
        <Link
          to="/tasks/today"
          title="Today's Tasks"
          className={
            (isActive("today") ? "text-yellow-400" : "") +
            " flex items-center justify-end bg-zinc-300 p-2 z-20 group-hover:translate-x-0 -translate-x-[80px] duration-500 rounded-tr-md group-hover:rounded-r-md"
          }
        >
          <span
            className={
              "w-[80px] whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Today
          </span>
          <IoTodayOutline size={32} />
        </Link>
      </li>
      <li className="group">
        <Link
          to="/tasks/week"
          title="Tasks for this Week"
          className={
            (isActive("week") ? "text-yellow-400" : "") +
            " flex items-center justify-end bg-zinc-300 p-2 z-20 group-hover:translate-x-0 -translate-x-[80px] duration-500 group-hover:rounded-r-md"
          }
        >
          <span
            className={
              "w-[80px] whitespace-nowrap overflow-hidden duration-500"
            }
          >
            This Week
          </span>
          <IoCalendarOutline size={32} />
        </Link>
      </li>
      <li className="group">
        <Link
          to="/tasks/important"
          title="Important Tasks"
          className={
            (isActive("important") ? "text-yellow-400" : "") +
            " flex items-center justify-end bg-zinc-300 p-2 z-20 group-hover:translate-x-0 -translate-x-[80px] duration-500 group-hover:rounded-r-md"
          }
        >
          <span
            className={
              "w-[80px] whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Important
          </span>
          <IoStarOutline size={32} />
        </Link>
      </li>
      <li className="group">
        <Link
          to="/tasks/overdue"
          title="Overdue Tasks"
          className={
            (isActive("overdue") ? "text-yellow-400" : "") +
            " flex items-center justify-end bg-zinc-300 p-2 z-20 group-hover:translate-x-0 -translate-x-[80px] duration-500 rounded-br-md group-hover:rounded-r-md"
          }
        >
          <span
            className={
              " w-[80px] whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Overdue
          </span>
          <IoRepeatOutline size={32} />
        </Link>
      </li>
    </ul>
  );
}
