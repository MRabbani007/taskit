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
import { RiDeviceRecoverLine } from "react-icons/ri";
import { ACTIONS } from "../data/serverFunctions";
import { FaBars, FaLaptopHouse } from "react-icons/fa";

const Offcanvas = forwardRef(
  (
    {
      viewSideBar,
      handleSidebar,
      todayTasks,
      weekTasks,
      userLists,
      handleLists,
      handleOpen,
      toggleCreateList,
    },
    ref
  ) => {
    const [viewTab, setViewTab] = useState("");
    return (
      <div
        ref={ref}
        className={
          (viewSideBar ? "left-0" : "left-[-500px]") +
          " fixed top-[50px] w-[300px] min-h-screen p-2 duration-300 bg-neutral-50"
        }
      >
        <div className="flex items-center gap-3 font-mono mb-3">
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onMouseOver={() => {
              setViewTab("today_tasks");
            }}
            onClick={() => {
              if (viewTab === "today_tasks") {
                setViewTab("");
              } else {
                setViewTab("today_tasks");
              }
            }}
          >
            {/* <IoTodayOutline className="icon mx-2" /> */}
            <img src={Today} alt="" className="icon-lg" />
            {/* <span>Today</span> */}
          </div>
          <div
            onMouseOver={() => {
              setViewTab("week_tasks");
            }}
            onClick={() => {
              if (viewTab === "week_tasks") {
                setViewTab("");
              } else {
                setViewTab("week_tasks");
              }
            }}
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            {/* <BsCalendar4Week className="icon mx-2 " /> */}
            <img src={Week} alt="" className="icon-lg" />
            {/* <span>1-Week</span> */}
          </div>
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onMouseOver={() => {
              setViewTab("user_lists");
            }}
            onClick={() => {
              if (viewTab === "user_lists") {
                setViewTab("");
              } else {
                setViewTab("user_lists");
              }
            }}
          >
            {/* <IoListOutline className="icon mx-2" /> */}
            <img src={IMG_List} alt="" className="icon-lg" />
            {/* <span>Lists</span> */}
          </div>
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onMouseOver={() => {
              setViewTab("trash");
            }}
            onClick={() => {
              if (viewTab === "trash") {
                setViewTab("");
              } else {
                setViewTab("trash");
              }
            }}
          >
            {/* <BsCalendar4Week className="icon mx-2 " /> */}
            <img src={IMG_Trash} alt="" className="icon-lg" />
            {/* <span>Trash</span> */}
          </div>
        </div>
        {/* Today Tasks */}
        <div className={viewTab === "today_tasks" ? "" : "hidden"}>
          {Array.isArray(todayTasks)
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
                    className="p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
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
            : null}
        </div>
        {/* Upcoming Tasks - 1 week */}
        <div className={viewTab === "week_tasks" ? "" : "hidden"}>
          {Array.isArray(weekTasks) &&
            weekTasks.map((task, index) => {
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
                  className="p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
                  onClick={() => {
                    handleOpen(task.listID);
                    handleSidebar();
                  }}
                >
                  <FaCircle className={color + " icon mr-2"} />
                  {task.title}
                </p>
              );
            })}
        </div>
        {/* Important Tasks */}
        <div className="hidden items-center my-2 text-red-700 font-semibold cursor-pointer">
          {/* <FaRegStar className="icon mx-2 " /> */}
          <img src={Important} alt="" className="icon-lg mr-2" />
          Important
        </div>
        {/* Notes */}
        <div
          onClick={() => null}
          className="hidden items-center my-2 pb-1 font-semibold cursor-pointer"
        >
          {/* <IoListOutline className="icon mx-2" /> */}
          <img src={IMG_NOTES} alt="" className="icon-lg mr-2" />
          Notes
        </div>
        {/* Task Lists */}
        {viewTab === "user_lists" ? (
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
            {/* Create List */}
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
        {/* Trash */}
        <div className={viewTab === "trash" ? "" : "hidden"}>
          {Array.isArray(userLists) &&
            userLists.map((list, index) => {
              if (list.trash === true) {
                return (
                  <div key={index}>
                    {/* <CardListName
                    key={index}
                    taskList={list}
                    handleOpen={handleOpen}
                    handleSidebar={handleSidebar}
                    toggleCreateList={toggleCreateList}
                    handleLists={handleLists}
                  /> */}
                    <p className="flex items-center">
                      <FaBars className="icon mr-2 my-2" />
                      {list.title}
                      <RiDeviceRecoverLine
                        onClick={() => {
                          handleLists({
                            type: ACTIONS.UPDATE_LIST,
                            listID: list.id,
                            updateItem: "un_trash",
                          });
                        }}
                        className="icon ml-2"
                      />
                    </p>
                  </div>
                );
              }
            })}
        </div>
      </div>
    );
  }
);

export default Offcanvas;
