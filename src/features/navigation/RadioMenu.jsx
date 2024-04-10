import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  IoAdd,
  IoCalendarOutline,
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const RadioMenu = () => {
  const [firstMenu, setFirstMenu] = useState(false);
  const [secondMenu, setSecondMenu] = useState(false);
  const expand = false;

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setFirstMenu(!firstMenu);
    setSecondMenu(!secondMenu);
  };

  const closeMenu = (e) => {
    if (firstMenu) {
      if (!menuRef?.current?.contains(e.target)) {
        toggleMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => closeMenu(e));
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div ref={menuRef} className="radio-menu bg-zinc-800 text-zinc-50">
      <BsThreeDots className="icon cursor-pointer" onClick={toggleMenu} />
      <div className="relative">
        <div
          className={
            (firstMenu
              ? "visible translate-y-0 opacity-100"
              : "invisible opacity-0 translate-y-6") +
            " absolute bottom-12 -right-2 duration-300 rounded-md bg-slate-200 text-slate-800"
          }
        >
          <Link
            to="/tasks/today"
            title="Today's Tasks"
            className="flex items-center p-2 rounded-t-md hover:bg-slate-300 duration-200"
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
            className="flex items-center p-2 hover:bg-slate-300 duration-200"
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
            className="flex items-center p-2 hover:bg-slate-300 duration-200"
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
            className="flex items-center p-2 rounded-b-md hover:bg-slate-300 duration-200"
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
        </div>
        <div
          className={
            (firstMenu
              ? "visible translate-x-0 opacity-100"
              : "invisible opacity-0 translate-x-6") +
            " absolute -bottom-2 -left-16 duration-300 rounded-full bg-slate-200 text-slate-800"
          }
        >
          <Link
            to="/createList"
            title="Create New List"
            className="flex items-center p-2 rounded-full hover:bg-slate-300 duration-200"
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
      </div>
    </div>
  );
};

export default RadioMenu;
