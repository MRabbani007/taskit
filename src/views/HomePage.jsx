import { useContext } from "react";
// Imported Context
import { GlobalContext } from "../context/GlobalState";
// Imported Components
import CreateList from "../components/CreateList";
import SectionTodoList from "../components/SectionTodoList";
import SectionListNames from "../components/SectionListNames";
import SectionWeekTasks from "../components/SectionWeekTasks";
import SectionTasksDay from "../components/SectionTasksDay";
import SectionTasksOverdue from "../components/SectionTasksOverdue";
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import SectionTasksImportant from "../components/SectionTasksImportant";
import SectionNotes from "../components/SectionNotes";
import BottomMenu from "../features/layout/BottomMenu";
import SectionTrash from "../components/SectionTrash";

const reducer = (state, action) => {
  switch (action.type) {
    case "get": {
      return action.lists;
    }
    case "createList": {
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.title,
          icon: action.icon,
          completed: false,
          tasks: [],
        },
      ];
    }
    case "deleteList": {
      return state.filter((list) => list.id !== action.listID);
    }
    case "updateListName": {
      let index = state.findIndex((list) => list.id === action.listID);
      state[index].title = action.title;
      return [...state];
    }
    case "toggleTodo": {
      state.map((list, index) => {
        let temp = list.tasks.findIndex((todo) => todo.id === action.todoID);
        if (temp >= 0) {
          state[index].tasks[temp].completed =
            !state[index].tasks[temp].completed;
        }
      });
      return [...state];
    }
    case "addTask": {
      let index = state.findIndex((list) => list.id === action.listID);
      state[index].tasks.push({
        id: crypto.randomUUID(),
        value: action.task,
        createDate: "",
        dueDate: "",
        priority: "",
        tags: [],
      });
      return [...state];
    }
    case "deleteTask": {
      let listIndex = state.findIndex((list) => list.id === action.listID);
      let taskIndex = state[listIndex].tasks.findIndex(
        (task) => task.id === action.taskID
      );
      state[listIndex].tasks.splice(taskIndex, 1);
      return [...state];
    }
    case "updateTask": {
      let listIndex = state.findIndex((list) => list.id === action.listID);
      let taskIndex = state[listIndex].tasks.findIndex(
        (task) => task.id === action.taskID
      );
      state[listIndex].tasks[taskIndex].value = action.newValue;
      return [...state];
    }
    default: {
      return state;
    }
  }
};

const HomePage = () => {
  const { listNames, displayList, viewCreateList, toggleCreateList, viewTab } =
    useContext(GlobalContext);

  return (
    <>
      <div className="flex font-normal gap-3">
        <div
          className={viewTab === "user_lists" ? "min-w-fit w-full" : "hidden"}
        >
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
        </div>
        {viewTab === "notes" && <SectionNotes />}
        {/* Create New Task List */}
        {viewTab === "create_list" && <CreateList />}
        {/* Container to display Task Lists */}
        <div
          className={viewTab === "task_list" ? "min-w-fit w-full" : "hidden"}
        >
          {displayList.length !== 0 &&
            displayList.map((listIndex) => {
              return (
                <SectionTodoList
                  displayList={listNames[listIndex]}
                  key={listNames[listIndex].id}
                />
              );
            })}
        </div>
      </div>
      <BottomMenu />
    </>
  );
};

export default HomePage;
