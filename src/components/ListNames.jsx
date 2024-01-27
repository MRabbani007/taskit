import React from "react";
// Imported Components
import CardListName from "./CardListName";

const ListNames = ({
  userLists,
  handleOpen,
  handleLists,
  dragStart,
  dragEnter,
  dragEnd,
}) => {
  if (!Array.isArray(userLists)) {
    return null;
  } else {
    return (
      // container
      <ul className="flex flex-col justify-center w-full m-0 p-0">
        {!userLists
          ? null
          : userLists.map((list, index) => (
              <CardListName
                key={index}
                taskList={list}
                dragStart={dragStart}
                dragEnter={dragEnter}
                dragEnd={dragEnd}
                handleOpen={handleOpen}
                handleLists={handleLists}
              />
            ))}
      </ul>
    );
  }
};

export default ListNames;