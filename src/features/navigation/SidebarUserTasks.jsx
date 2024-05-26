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

  const isActive = (page) => location.pathname.split("/").includes(page);

  return (
    <ul className="side-menu">
      <li>
        <Link
          to="/tasks/today"
          title="Today's Tasks"
          className={isActive("today") ? "text-yellow-400" : "text-white"}
        >
          <IoTodayOutline size={32} />
        </Link>
      </li>
      <li>
        <Link
          to="/tasks/week"
          title="Tasks for this Week"
          className={isActive("week") ? "text-yellow-400" : "text-white"}
        >
          <IoCalendarOutline size={32} />
        </Link>
      </li>
      <li>
        <Link
          to="/tasks/important"
          title="Important Tasks"
          className={isActive("important") ? "text-yellow-400" : "text-white"}
        >
          <IoStarOutline size={32} />
        </Link>
      </li>
      <li className="group">
        <Link
          to="/tasks/overdue"
          title="Overdue Tasks"
          className={isActive("overdue") ? "text-yellow-400" : "text-white"}
        >
          <IoRepeatOutline size={32} />
        </Link>
      </li>
    </ul>
  );
}
