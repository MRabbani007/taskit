import React, { useContext, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { GrDocumentNotes, GrTask } from "react-icons/gr";
import {
  IoAdd,
  IoAddCircleOutline,
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoMenu,
  IoMenuOutline,
  IoRepeatOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import useAuth from "../../hooks/useAuth";
import { FiUser } from "react-icons/fi";

const Sidebar = () => {
  const { viewTab, handleViewTab } = useContext(GlobalContext);
  const { auth } = useAuth();
  const [expand, setExpand] = useState(false);

  return (
    <nav className="">
      {/* Top Block */}
      <div className={"flex flex-col items-start gap-3 h-full"}>
        <Link
          to="/tasks/today"
          title="Today's Tasks"
          className="flex items-center"
        >
          <IoTodayOutline className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Today
          </span>
        </Link>
        <Link
          to="/tasks/week"
          title="Tasks for this Week"
          className="flex items-center"
        >
          <IoCalendarOutline className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            This Week
          </span>
        </Link>
        <Link
          to="/tasks/important"
          title="Important Tasks"
          className="flex items-center"
        >
          <IoStarOutline className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Important
          </span>
        </Link>
        <Link
          to="/tasks/overdue"
          title="Overdue Tasks"
          className="flex items-center"
        >
          <IoRepeatOutline className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Overdue
          </span>
        </Link>
        {/* <button onClick={() => setExpand(!expand)}>
          <RxDoubleArrowRight
            className={(expand ? "rotate-180" : "") + " icon duration-500"}
          />
        </button> */}
      </div>

      {/* Middle Block */}
      <div className="hidden flex-col justify-center gap-3 h-full">
        <span
          className={
            (viewTab === "user_lists" ? "text-yellow-500" : "") +
            " flex items-center"
          }
          onClick={() => {
            handleViewTab("user_lists");
          }}
        >
          <IoMenuOutline title="Show Lists" className="icon duration-500" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            My Lists
          </span>
        </span>
        <span
          className={
            (viewTab === "task_list" ? "text-yellow-500" : "") +
            " flex items-center"
          }
          onClick={() => {
            handleViewTab("task_list");
          }}
        >
          <IoListOutline title="Task List" className="icon duration-500" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Todo List
          </span>
        </span>
        <span
          className={
            (viewTab === "create_list" ? "text-yellow-500" : "") +
            " flex items-center"
          }
          onClick={() => {
            handleViewTab("create_list");
          }}
        >
          <IoAddCircleOutline
            title="Add New List"
            className="icon duration-500"
          />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Create Lists
          </span>
        </span>
        <span
          className={
            (viewTab === "tasks" ? "text-yellow-500" : "") +
            " flex items-center"
          }
          onClick={() => {
            handleViewTab("tasks");
          }}
        >
          <GrTask title="Show Tasks" className="icon duration-500" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Tasks
          </span>
        </span>
        <span
          className={
            (viewTab === "notes" ? "text-yellow-500" : "") +
            " flex items-center"
          }
          onClick={() => {
            handleViewTab("notes");
          }}
        >
          <GrDocumentNotes title="Notes" className="icon duration-500" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Notes
          </span>
        </span>
      </div>

      <div>
        <Link
          to="/createList"
          title="Create New List"
          className="flex items-center"
        >
          <IoAdd className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            New List
          </span>
        </Link>
      </div>

      {/* Bottom Block */}
      <div className="hidden flex-col items-center gap-3">
        <Link to="/login" className="flex items-center">
          <FiUser className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            {auth?.user}
          </span>
        </Link>
        <Link to="/settings" className="flex items-center">
          <IoSettingsOutline className="icon" />
          <span
            className={
              (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
              " whitespace-nowrap overflow-hidden duration-500"
            }
          >
            Settings
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
