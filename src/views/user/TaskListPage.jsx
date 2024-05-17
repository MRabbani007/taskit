import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import SectionTodoList from "../../features/taskList/SectionTodoList";
import { useNavigate } from "react-router-dom";

const TaskListPage = () => {
  const { listNames, displayList, viewTab, handleViewTab } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!displayList?.length) {
      navigate("/mylists");
    }
  }, []);

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
