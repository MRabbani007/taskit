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

// Store Index of dragged item
const dragItem = useRef();
// Store Index of dragged over item
const dragOverItem = useRef();
// On Drag Start
const dragStart = ({ id, type, index, title }) => {
  dragItem.current = { id, type, index, title };
};
// On Drag Over Item
const dragEnter = ({ id, type, index, title }) => {
  dragOverItem.current = { id, type, index, title };
};
const dragEnd = () => {
  if (!dragItem.current?.index || !dragOverItem.current?.index) {
    dragItem.current = null;
    dragOverItem.current = null;
    return;
  }

  const item = notes.splice(dragItem.current?.index, 1)[0];

  const newNotes = [...notes];
  newNotes.splice(dragOverItem.current?.index, 0, item);

  handleNotesSort(newNotes);

  dragItem.current = null;
  dragOverItem.current = null;
  message.success("Sort saved");
};
