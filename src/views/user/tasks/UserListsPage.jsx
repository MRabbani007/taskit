import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Context
import { ListContext } from "../../../context/ListState";
// Components
import CardListName from "../../../features/taskList/CardListName";
import CardListTrash from "../../../features/taskList/CardListTrash";
import Loading from "../../../features/components/Loading";
// AntD
import { PlusOutlined } from "@ant-design/icons";
// Icons
import { CiTrash } from "react-icons/ci";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { FloatButton } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const UserListsPage = () => {
  const { userLists, pinnedLists, trashLists, status, handleSort } =
    useContext(ListContext);
  const [expand, setExpand] = useState(true);
  const [expandTrash, setExpandTrash] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items =
      result?.source.droppableId === "pinnedLists"
        ? Array.from(pinnedLists)
        : Array.from(userLists);

    if (result.destination.index === result.source.index) return;

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleSort(result?.source.droppableId, items);
  };

  let contentLists;
  let contentPinned;
  let contentTrash;

  if (status?.isLoading === true) {
    contentLists = <Loading />;
    contentTrash = <Loading />;
  } else if (status?.isError === true) {
    contentLists = <p>Error Loading Lists</p>;
    contentTrash = <p>Error Loading Lists</p>;
  } else if (status?.isSuccess === true) {
    if (userLists.length === 0 && pinnedLists.length === 0) {
      contentLists = <p>You don't have any lists, create new</p>;
    } else {
      contentPinned = pinnedLists.map((list, index) => {
        return (
          <Draggable key={list.id} draggableId={list.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <CardListName key={index} taskList={list} />
              </div>
            )}
          </Draggable>
        );
      });
      contentLists = userLists.map((list, index) => {
        return (
          <Draggable key={list.id} draggableId={list.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <CardListName key={index} taskList={list} />
              </div>
            )}
          </Draggable>
        );
      });
    }
    if (trashLists.length === 0) {
      contentTrash = (
        <p className="font-medium text-zinc-800">No lists in trash</p>
      );
    } else {
      contentTrash = (
        <ul className="flex flex-col gap-2">
          {trashLists.map((list, index) => {
            return <CardListTrash list={list} key={index} />;
          })}
        </ul>
      );
    }
  }

  return (
    <main>
      <header onClick={() => setExpand((prev) => !prev)}>
        <BsCardList size={40} />
        <h1 className="flex-1 font-normal">My Lists</h1>
        <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + " duration-300"}
        />
      </header>
      <section
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 invisible h-0 ") + " duration-300"
        }
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pinnedLists">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {contentPinned}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="userLists">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {contentLists}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      <header onClick={() => setExpandTrash((prev) => !prev)}>
        <CiTrash size={40} />
        <h2 className="flex-1">Trash</h2>
        <SlArrowRight
          size={25}
          className={(expandTrash ? "rotate-90 " : "") + " duration-300"}
        />
      </header>
      <section
        className={
          (expandTrash
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 h-0") + " duration-300"
        }
      >
        {contentTrash}
      </section>
      <Link to={"/createList"}>
        <FloatButton
          type="primary"
          tooltip="Create New List"
          icon={<PlusOutlined />}
          style={{ right: 94 }}
        />
      </Link>
    </main>
  );
};

export default UserListsPage;
