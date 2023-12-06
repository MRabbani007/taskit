import React, { useEffect, useRef, useState } from "react";
import CreateList from "./CreateList";
import TodoListNames from "./TodoListNames";
import ListItems from "./ListItems";
import TodoIcon from "../assets/icon.png";

// Main Todo App Container
const TodoList = () => {
  const [listNames, setListNames] = useState(() => {
    const localValue = localStorage.getItem("TodoList");
    if (localValue == null || localValue === "undefined") return [];
    return JSON.parse(localValue);
  });

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

  function getListIndex(listID) {
    let listIndex = null;
    listNames.map((list, index) => {
      if (list.id === listID) {
        listIndex = index;
      }
    });
    return listIndex;
  }

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(listNames));
  }, [listNames]);

  function createList(title) {
    setListNames((currentlistNames) => {
      return [
        ...currentlistNames,
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false,
          todoitems: [
            // { id: crypto.randomUUID(), value: "item1" },
            // { id: crypto.randomUUID(), value: "item2" },
          ],
        },
      ];
    });
  }

  function deleteList(listID) {
    setListNames((currentListNames) => {
      return currentListNames.filter((listName) => listName.id !== listID);
    });
    setDisplayList((currentDisplayList) => {
      return currentDisplayList.filter((listName) => listName.id !== listID);
    });
  }

  // Handle opening new todo List
  function handleOpen(listID) {
    listNames.map((listName) => {
      if (listName.id === listID) {
        setDisplayList((currentDisplayList) => {
          return [
            // remove list from display if list already open
            ...currentDisplayList.filter((listName) => listName.id !== listID),
            // add new list to display
            listName,
          ];
        });
      }
    });
  }

  // Handle closing todo List
  function handleClose(listID) {
    setDisplayList((currentDisplayList) => {
      return currentDisplayList.filter((todoList) => todoList.id !== listID);
    });
  }

  // Add new todo item to list
  function addTodoItem(listID, item) {
    setListNames((currentListNames) => {
      currentListNames.map((listName) => {
        if (listName.id === listID) {
          listName.todoitems.push({
            id: crypto.randomUUID(),
            value: item,
          });
        }
      });
      return [...currentListNames];
    });
  }

  function deleteTodoItem(listID, itemID) {
    setListNames((currentListNames) => {
      currentListNames.map((listName) => {
        if (listName.id === listID) {
          listName.todoitems = listName.todoitems.filter(
            (item) => item.id !== itemID
          );
        }
      });
      return [...currentListNames];
    });
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-5">
        {/* Container */}
        <div className="col-span-1 flex justify-center">
          <div className="bg-sky-950 w-[600px] my-4 border-[1px] border-gray-300 text-gray-100">
            {/* Title */}
            <div className="border-b-[1px] border-gray-300 text-2xl font-thin font-gen-sans px-4 py-3">
              Todo List
              <img src={TodoIcon} alt="icon" className="icon-lg mx-2" />
            </div>
            {/* Body */}
            <div className="p-3">
              {/* Create New Todo List */}
              <CreateList onSubmit={createList} />
              {/* Display Todo Lists */}
              <TodoListNames
                listNames={listNames}
                // toggleTodo={toggleTodo}
                deleteList={deleteList}
                handleOpen={handleOpen}
                dragStart={dragStart}
                dragEnter={dragEnter}
                dragEnd={dragEnd}
              />
            </div>
          </div>
        </div>
        {/* Container to display Todo Lists */}
        <div className="lg:col-span-2 col-span-1 flex flex-wrap justify-center text-4xl p-2 bg-sky-900">
          {displayList.length != 0 &&
            displayList.map((todoList) => {
              return (
                <ListItems
                  displayList={todoList}
                  handleClose={handleClose}
                  addTodoItem={addTodoItem}
                  deleteTodoItem={deleteTodoItem}
                  dragItemStart={dragItemStart}
                  dragItemEnter={dragItemEnter}
                  dragItemEnd={dragItemEnd}
                  key={todoList.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
