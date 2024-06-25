import React from "react";
import { useDrop } from "react-dnd";

export default function DroppableContainer({
  children,
  onDropItem,
  acceptType,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: acceptType,
    drop: (item) => {
      onDropItem(item); // Pass item data to parent component for handling
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="flex flex-wrap gap-4 items-stretch">
      {children}
    </div>
  );
}
