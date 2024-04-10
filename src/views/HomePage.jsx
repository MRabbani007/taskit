import { useContext } from "react";
// Imported Context
import { GlobalContext } from "../context/GlobalState";
import SectionListNames from "../features/userLists/SectionListNames";
import SectionTrash from "../features/userLists/SectionTrash";

import SectionTasksImportant from "../features/tasksPage/SectionTasksImportant";
import SectionTasksOverdue from "../features/tasksPage/SectionTasksOverdue";
import SectionTasksDay from "../features/tasksPage/SectionTasksDay";
import SectionWeekTasks from "../features/tasksPage/SectionWeekTasks";

import SectionNotes from "../features/notes/SectionNotes";

import SectionTodoList from "../features/taskList/SectionTodoList";
import CreateList from "../features/createTaskList/CreateList";
import UserLists from "../features/userLists/UserLists";
import UserTasks from "../features/userLists/UserTasks";
// Imported Components

const HomePage = () => {
  const { listNames, displayList, viewTab, handleViewTab } =
    useContext(GlobalContext);

  return (
    <div className="flex flex-1 gap-3">
      <p>Hello!</p>
      {/* <div className={viewTab === "" ? "min-w-fit w-full" : "hidden"}>
        <SectionListNames />
        <SectionTrash />
      </div>
      <div
        className={
          viewTab === "tasks" ? "flex flex-wrap gap-3 w-full" : "hidden"
        }
      >
        <SectionTasksImportant />
        <SectionTasksOverdue />
        <SectionTasksDay />
        <SectionWeekTasks />
      </div> */}
      {/* {viewTab === "notes" && <SectionNotes />} */}
      {/* Create New Task List */}
      {/* {viewTab === "create_list" && <CreateList />} */}
      {/* Container to display Task Lists */}
      {/* <div className={viewTab === "task_list" ? "min-w-fit w-full" : "hidden"}>
        {displayList.length !== 0 &&
          displayList.map((listIndex) => {
            return (
              <SectionTodoList
                displayList={listNames[listIndex]}
                key={listNames[listIndex]?.id}
              />
            );
          })}
      </div> */}
    </div>
  );
};

export default HomePage;
