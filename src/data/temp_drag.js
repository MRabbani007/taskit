// TODO: fix user sorting and drag

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
