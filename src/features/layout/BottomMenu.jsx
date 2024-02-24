import React, { useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { IoAddCircleOutline, IoHomeOutline, IoMenu } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { GrDocumentNotes } from "react-icons/gr";
import { GlobalContext } from "../../context/GlobalState";

const BottomMenu = () => {
  const { toggleCreateList, setViewTasks, setViewTab } =
    useContext(GlobalContext);

  return (
    <div className="bottom-menu bg-zinc-950 text-zinc-300 px-3">
      <IoMenu
        title="Show Lists"
        className="icon"
        onClick={() => {
          setViewTab("user_lists");
        }}
      />
      <IoAddCircleOutline
        title="Add New List"
        className="icon"
        onClick={() => {
          toggleCreateList();
          setViewTab("create_list");
        }}
      />
      <GrTask
        title="Show Tasks"
        className="icon"
        onClick={() => {
          setViewTasks((prev) => !prev);
          setViewTab("tasks");
        }}
      />
      <GrDocumentNotes
        title="Notes"
        className="icon"
        onClick={() => {
          setViewTab("notes");
        }}
      />
    </div>
  );
};

export default BottomMenu;
