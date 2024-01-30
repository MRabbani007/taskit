import React, { useEffect, useRef, useState } from "react";
// Imported Icons
import { IoCreateOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Offcanvas from "./Offcanvas";
import { Link } from "react-router-dom";

const Navbar = ({
  todayTasks,
  weekTasks,
  userLists,
  handleOpen,
  handleLists,
  toggleCreateList,
}) => {
  const [viewSideBar, setViewSideBar] = useState(false);
  const sideBarRef = useRef();
  const sideBarButtonRef = useRef();

  const handleSideBar = () => {
    setViewSideBar(!viewSideBar);
    // setViewSideBar(false);
  };

  const closeSideBar = (e) => {
    if (!sideBarRef.current.contains(e.target)) {
      if (sideBarButtonRef.current.contains(e.target)) {
      } else {
        setViewSideBar(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full h-[50px] z-50 flex items-center justify-between px-5 gap-5 bg-amber-900 text-slate-50">
        <div className="flex items-center gap-5">
          <div ref={sideBarButtonRef}>
            <IoMenuSharp className="icon-lg" onClick={handleSideBar} />
          </div>

          <Link to="/">
            <IoHomeOutline className="icon-lg" />
          </Link>
          {/* <span>ToDo</span>
          <IoCreateOutline className="icon-lg" /> */}
        </div>
        <div className="flex items-center gap-5">
          <MdOutlineDarkMode className="icon-lg" />
          <Link to="/signin">
            <FaRegCircleUser className="icon-lg" />
          </Link>
        </div>
      </div>
      <Offcanvas
        viewSideBar={viewSideBar}
        ref={sideBarRef}
        handleSidebar={handleSideBar}
        todayTasks={todayTasks}
        weekTasks={weekTasks}
        userLists={userLists}
        handleOpen={handleOpen}
        handleLists={handleLists}
        toggleCreateList={toggleCreateList}
      />
    </>
  );
};

export default Navbar;
