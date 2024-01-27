import React, { useState } from "react";
// Imported Icons
import { IoCreateOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Offcanvas from "./Offcanvas";
import { Link } from "react-router-dom";

const Navbar = ({
  todayTasks,
  userLists,
  handleOpen,
  handleLists,
  toggleCreateList,
}) => {
  const [viewSideBar, setViewSideBar] = useState(false);

  const handleSideBar = () => {
    setViewSideBar(!viewSideBar);
    // setViewSideBar(false);
  };

  return (
    <>
      <div className="fixed top-0 w-full h-[50px] flex items-center justify-between px-5 gap-5 bg-yellow-400 text-slate-950">
        <div className="flex items-center gap-5">
          <IoMenuSharp className="icon-lg" onClick={handleSideBar} />
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
        handleSidebar={handleSideBar}
        todayTasks={todayTasks}
        userLists={userLists}
        handleOpen={handleOpen}
        handleLists={handleLists}
        toggleCreateList={toggleCreateList}
      />
    </>
  );
};

export default Navbar;
