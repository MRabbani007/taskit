import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Imported Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateList from "../components/CreateList";
import CardTodoList from "../components/CardTodoList";
// Imported Data
import { ACTIONS, fetchServer } from "../data/serverFunctions";
import { genDate } from "../data/utils";

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
  const [userName, setUserName] = useState("");
  const [listNames, setListNames] = useState();
  const [todayTasks, setTodayTasks] = useState([]);
  const [todayDate, setTodayDate] = useState(genDate(0));

  const [userLists, dispatch] = useReducer(reducer, []);

  // View Create List Component
  const [viewCreateList, setViewCreateList] = useState(false);
  const toggleCreateList = () => {
    setViewCreateList(!viewCreateList);
    setDisplayList([]);
  };

  const [displayList, setDisplayList] = useState([]);

  // Drag List Names
  // Store Index of dragged item
  const dragItem = useRef();
  // Store Index of dragged over item
  const dragOverItem = useRef();
  // On Drag Start
  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  // On Drag Over Item
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  // On Drag End
  const dragEnd = () => {
    // Dupplicate list names
    let currentListNames = [...listNames];
    // Copy dragged item
    const draggedItemContent = currentListNames.splice(dragItem.current, 1)[0];
    // insert dragged item into position
    currentListNames.splice(dragOverItem.current, 0, draggedItemContent);
    // reset the reference
    dragItem.current = null;
    dragOverItem.current = null;
    // update actual array
    setListNames(currentListNames);
  };

  const dragTodoItem = useRef();
  const dragOverTodoItem = useRef();
  const dragItemStart = (e, listID, position) => {
    dragTodoItem.current = { id: listID, pos: position };
  };
  const dragItemEnter = (e, listID, position) => {
    dragOverTodoItem.current = { id: listID, pos: position };
  };
  const dragItemEnd = () => {
    // if user did not drag over new item
    if (!dragOverTodoItem) return;
    // if no item dragged
    if (!dragTodoItem) return;
    // if drag in same list
    if (dragTodoItem.current.id === dragOverTodoItem.current.id) {
      // duplicate list names
      let currentListNames = [...listNames];
      // remove dragged todo item
      const draggedItemContent = currentListNames[
        getListIndex(dragTodoItem.current.id)
      ].todoitems.splice(dragTodoItem.current.pos, 1)[0];
      // insert dragged item into position
      currentListNames[getListIndex(dragTodoItem.current.id)].todoitems.splice(
        dragOverTodoItem.current.pos,
        0,
        draggedItemContent
      );
      // reset the reference
      dragTodoItem.current = null;
      dragOverTodoItem.current = null;
      // update actual array
      setListNames(currentListNames);
    }
    // if drag to different list
    else if (dragTodoItem.current.id !== dragOverTodoItem.current.id) {
      // if user did not drag over new item
      if (!dragOverTodoItem) return;
      // if no item dragged
      if (!dragTodoItem) return;

      let currentListNames = [...listNames];
      // remove dragged todo item
      const draggedItemContent = currentListNames[
        getListIndex(dragTodoItem.current.id)
      ].todoitems.splice(dragTodoItem.current.pos, 1)[0];
      // insert dragged item into position
      currentListNames[
        getListIndex(dragOverTodoItem.current.id)
      ].todoitems.splice(dragOverTodoItem.current.pos, 0, draggedItemContent);
      // reset the reference
      dragTodoItem.current = null;
      dragOverTodoItem.current = null;
      // update actual array
      setListNames(currentListNames);
    }
  };

  useEffect(() => {
    loaduser();
  }, []);

  useEffect(() => {
    if (userName !== "") {
      // Load user lists
      handleLists({ type: ACTIONS.GET_LISTS });
      // Load today tasks
      handleGetTasks();
    }
  }, [userName]);

  const handleLists = async (action) => {
    switch (action.type) {
      case ACTIONS.GET_LISTS: {
        let data = await fetchServer({
          type: ACTIONS.GET_LISTS,
          userName: userName,
        });
        dispatch({ type: "get", lists: data });
        break;
      }
      case ACTIONS.CREATE_LIST: {
        let data = await fetchServer({
          type: ACTIONS.CREATE_LIST,
          userName: userName,
          list: { title: action.title, icon: action.icon, tasks: [] },
        });
        handleGetLists();
        break;
      }
      case ACTIONS.REMOVE_LIST: {
        let data = await fetchServer({
          type: ACTIONS.REMOVE_LIST,
          userName: userName,
          listID: action.listID,
        });
        setDisplayList((currentDisplayList) => {
          return currentDisplayList.filter(
            (listName) => userLists[listName].id !== listID
          );
        });
        handleGetLists();
        break;
      }
      case ACTIONS.UPDATE_LIST: {
        let data = await fetchServer({
          type: ACTIONS.UPDATE_LIST,
          userName: userName,
          listID: action.listID,
          updateItem: action.updateItem,
          newValue: action.newValue,
        });
        await handleGetLists();
        if (displayList[0].id === action.listID) {
          handleOpen(action.listID);
        }
        // dispatch({ type: "updateListName", listID: listID, title: newTitle });
        break;
      }
      default: {
      }
    }
  };

  // TODO: update frontend based on acknoledge response from DB
  const handleGetLists = async () => {
    let data = await fetchServer({
      type: ACTIONS.GET_LISTS,
      userName: userName,
    });
    dispatch({ type: "get", lists: data });
    return true;
  };

  const handleGetTasks = async () => {
    let data = await fetchServer({
      type: ACTIONS.GET_TASKS_TODAY,
      userName: userName,
    });
    setTodayTasks(data);
  };

  const loaduser = () => {
    let data = localStorage.getItem("todoUser");
    if (data) {
      setUserName(JSON.parse(data));
    }
  };

  // TODO: Move
  // const handleAddTask = (listID, task) => {
  //   dispatch({ type: "addTask", listID: listID, task: task });
  //   fetchAddTask(userName, listID, task);
  // };

  // TODO: Move
  // const handleDeleteTask = (listID, taskID) => {
  //   dispatch({ type: "deleteTask", listID: listID, taskID: taskID });
  //   fetchServer({
  //     type: "remove_task",
  //     userName: userName,
  //     listID: listID,
  //     taskID: taskID,
  //   });
  // };

  // TODO: Move
  // const handleToggleTask = (todoID) => {
  //   dispatch({ type: "toggleTodo", todoID: todoID });
  // };

  // TODO: Move
  // const handleUpdateTask = (listID, taskID, newValue) => {
  //   dispatch({
  //     type: "updateTask",
  //     listID: listID,
  //     taskID: taskID,
  //     newValue: newValue,
  //   });
  // };

  // Handle opening new todo List

  const handleOpen = (listID) => {
    let listIndex = userLists.findIndex((list) => list.id === listID);
    setDisplayList([listIndex]);
    setViewCreateList(false);
    // setDisplayList((currentDisplayList) => {
    //   return [
    //     // remove list from display if list already open
    //     ...currentDisplayList.filter((listName) => listName.id !== listID),
    //     // add new list to display
    //     userLists[listIndex],
    //   ];
    // });
  };

  // Handle closing todo List
  function handleClose(listID) {
    setDisplayList((currentDisplayList) => {
      return currentDisplayList.filter(
        (listIndex) => userLists[listIndex].id !== listID
      );
    });
  }

  return (
    <>
      <Navbar
        todayTasks={todayTasks}
        userLists={userLists}
        handleOpen={handleOpen}
        handleLists={handleLists}
        toggleCreateList={toggleCreateList}
      />
      <div className="pt-[50px] bg-slate-50 flex font-normal">
        {/* Sidebar */}
        {/* <Sidebar
          todayTasks={todayTasks}
          userLists={userLists}
          handleOpen={handleOpen}
          handleLists={handleLists}
          toggleCreateList={toggleCreateList}
        /> */}
        {/* Container */}
        <div className="flex-1">
          {/* Header */}
          <div className="m-4">
            <h1 className="">
              {userName === "" ? (
                <Link to="/signin" className="btn btn-yellow">
                  Signin
                </Link>
              ) : (
                <span className="">{"Hello, " + userName}</span>
              )}
            </h1>
            <p className="btn btn-yellow my-2">
              {todayDate.day + ", " + todayDate.date + " " + todayDate.month}
            </p>
          </div>
          <div>
            {/* Create New Task List */}
            <CreateList
              handleLists={handleLists}
              viewCreateList={viewCreateList}
              setViewCreateList={setViewCreateList}
            />
          </div>
          {/* Container to display Task Lists */}
          <div className="flex flex-wrap justify-center text-4xl p-2 w-full">
            {displayList.length != 0 &&
              displayList.map((listIndex) => {
                return (
                  <CardTodoList
                    userName={userName}
                    displayList={userLists[listIndex]}
                    handleLists={handleLists}
                    handleClose={handleClose}
                    dragItemStart={dragItemStart}
                    dragItemEnter={dragItemEnter}
                    dragItemEnd={dragItemEnd}
                    key={userLists[listIndex].id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
