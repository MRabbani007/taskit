import React, { forwardRef, useState } from "react";
// Imported Components
import ListNames from "../components/ListNames";
// Imported Media
import Today from "../assets/today.png";
import Week from "../assets/week.png";
import Important from "../assets/important.png";
import IMG_List from "../assets/list.png";
import IMG_Trash from "../assets/trash-2.png";
import IMG_NOTES from "../assets/notes.png";
import { FaCircle, FaCirclePlus } from "react-icons/fa6";

const Offcanvas = forwardRef(
  (
    {
      viewSideBar,
      handleSidebar,
      todayTasks,
      userLists,
      handleLists,
      handleOpen,
      toggleCreateList,
    },
    ref
  ) => {
    const [viewUserLists, setViewUserLists] = useState(true);
    const [viewToday, setViewToday] = useState(true);
    const toggleUserLists = () => {
      setViewUserLists(!viewUserLists);
    };
    return (
      <div
        ref={ref}
        className={
          (viewSideBar ? "left-0" : "left-[-500px]") +
          " fixed top-[50px] w-[300px] min-h-screen bg-amber-100 border-[1px] text-slate-950 p-2 duration-300 overflow-y-auto"
        }
      >
        <div
          className="flex items-center my-2 text-yellow-600 font-semibold cursor-pointer"
          onClick={() => setViewToday(!viewToday)}
        >
          {/* <IoTodayOutline className="icon mx-2" /> */}
          <img src={Today} alt="" className="icon-lg mr-2" />
          <span>Today</span>
        </div>
        <div className="flex flex-col">
          {viewToday
            ? !!todayTasks
              ? todayTasks.map((task, index) => {
                  let color = "";
                  if (task.priority === "high") {
                    color = "text-red-400";
                  } else if (task.priority === "normal") {
                    color = "text-yellow-200";
                  } else if (task.priority === "low") {
                    color = "text-green-200";
                  }
                  return (
                    <p
                      key={index}
                      className="border-[1px] p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer shadow-sm shadow-slate-500"
                      onClick={() => {
                        handleOpen(task.listID);
                        handleSidebar();
                      }}
                    >
                      <FaCircle className={color + " icon mr-2"} />
                      {task.title}
                    </p>
                  );
                })
              : null
            : null}
        </div>
        {/* Upcoming Tasks - 1 week */}
        <div className="flex items-center my-2 text-blue-700 font-semibold cursor-pointer">
          {/* <BsCalendar4Week className="icon mx-2 " /> */}
          <img src={Week} alt="" className="icon-lg mr-2" />
          Upcoming
        </div>
        {/* Important Tasks */}
        <div className="flex items-center my-2 text-red-700 font-semibold cursor-pointer">
          {/* <FaRegStar className="icon mx-2 " /> */}
          <img src={Important} alt="" className="icon-lg mr-2" />
          Important
        </div>
        {/* Notes */}
        <div
          onClick={() => null}
          className="flex items-center my-2 pb-1 font-semibold cursor-pointer"
        >
          {/* <IoListOutline className="icon mx-2" /> */}
          <img src={IMG_NOTES} alt="" className="icon-lg mr-2" />
          Notes
        </div>
        {/* Task Lists */}
        <div
          onClick={() => toggleUserLists()}
          className="flex items-center my-2 pb-1 font-semibold cursor-pointer"
        >
          {/* <IoListOutline className="icon mx-2" /> */}
          <img src={IMG_List} alt="" className="icon-lg mr-2" />
          Lists
        </div>
        {viewUserLists ? (
          <>
            {/* Display Todo Lists */}
            <ListNames
              userLists={userLists}
              handleLists={handleLists}
              handleOpen={handleOpen}
              handleSidebar={handleSidebar}
              toggleCreateList={toggleCreateList}
              // dragStart={dragStart}
              // dragEnter={dragEnter}
              // dragEnd={dragEnd}
            />
            <div
              className="flex items-center my-2"
              onClick={() => {
                toggleCreateList();
                handleSidebar();
              }}
            >
              <FaCirclePlus className="icon-lg mx-2 text-yellow-500" />
            </div>
          </>
        ) : null}
        <div className="flex items-center my-2 text-gray-700 font-semibold cursor-pointer">
          {/* <BsCalendar4Week className="icon mx-2 " /> */}
          <img src={IMG_Trash} alt="" className="icon-lg mr-2" />
          Move to Trash
        </div>
      </div>
    );
  }
);

export default Offcanvas;
