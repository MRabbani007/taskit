import React, { useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { IoAddCircleOutline, IoHomeOutline, IoMenu } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { GrDocumentNotes } from "react-icons/gr";
import { GlobalContext } from "../../context/GlobalState";

const BottomMenu = () => {
  const { viewTab, handleViewTab } = useContext(GlobalContext);

  return (
    <div className="bottom-menu bg-zinc-950 text-zinc-300 px-3">
      <span className="flex items-center">
        <IoMenu
          title="Show Lists"
          className={
            (viewTab === "user_lists" ? "text-yellow-500" : "") +
            " icon mr-1 duration-500"
          }
          onClick={() => {
            handleViewTab("user_lists");
          }}
        />
        {/* {viewTab === "user_lists" ? (
          <span className="text-yellow-500">Lists</span>
        ) : null} */}
      </span>
      <span className="flex items-center">
        <IoAddCircleOutline
          title="Add New List"
          className={
            (viewTab === "create_list" ? "text-yellow-500" : "") +
            " icon mr-1 duration-500"
          }
          onClick={() => {
            handleViewTab("create_list");
          }}
        />
        {/* {viewTab === "create_list" ? (
          <span className="text-yellow-500">Create</span>
        ) : null} */}
      </span>
      <span className="flex items-center">
        <GrTask
          title="Show Tasks"
          className={
            (viewTab === "tasks" ? "text-yellow-500" : "") +
            " icon mr-1 duration-500"
          }
          onClick={() => {
            handleViewTab("tasks");
          }}
        />
        {/* {viewTab === "tasks" ? (
          <span className="text-yellow-500">Tasks</span>
        ) : null} */}
      </span>
      <span className="flex items-center">
        <GrDocumentNotes
          title="Notes"
          className={
            (viewTab === "notes" ? "text-yellow-500" : "") +
            " icon mr-1 duration-500"
          }
          onClick={() => {
            handleViewTab("notes");
          }}
        />
        {/* {viewTab === "notes" ? (
          <span className="text-yellow-500">Notes</span>
        ) : null} */}
      </span>
    </div>
  );
};

export default BottomMenu;
