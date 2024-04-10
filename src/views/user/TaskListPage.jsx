import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import SectionTodoList from "../../features/taskList/SectionTodoList";

const TaskListPage = () => {
  const { listNames, displayList, viewTab, handleViewTab } =
    useContext(GlobalContext);

  return (
    <div className={viewTab === "task_list" ? "min-w-fit w-full" : "hidden"}>
      {displayList.length !== 0 &&
        displayList.map((listIndex) => {
          return (
            <SectionTodoList
              displayList={listNames[listIndex]}
              key={listNames[listIndex]?.id}
            />
          );
        })}
    </div>
  );
};

export default TaskListPage;
