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
  const { lists, status, handleSort } = useContext(ListContext);
  const [expand, setExpand] = useState(true);
  const [expandTrash, setExpandTrash] = useState(false);

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const items =
      result?.source.droppableId === "pinnedLists"
        ? Array.from(lists.pinnedLists)
        : Array.from(lists.userLists);

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
  } else if (status.isSuccess === true) {
    if (lists.userLists.length === 0) {
      contentLists = <p>You don't have any lists, create new</p>;
    } else {
      contentPinned = lists.pinnedLists.map((list, index) => {
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
      contentLists = lists.userLists.map((list, index) => {
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
    if (lists.trashLists.length === 0) {
      contentTrash = (
        <p className="p-4 font-medium text-zinc-800">No lists in trash</p>
      );
    } else {
      contentTrash = (
        <ul
          className={
            (expandTrash
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 h-0") +
            " py-4 duration-300 flex flex-col gap-2 w-full"
          }
        >
          {lists.trashLists.map((list, index) => {
            return <CardListTrash list={list} key={index} />;
          })}
        </ul>
      );
    }
  }

  return (
    <main>
      {/* User Lists */}
      <header
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white shadow-md shadow-zinc-500"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <BsCardList size={40} />
          <h1>My Lists</h1>
        </div>
        <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      <section className="w-full">
        <div
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 invisible h-0 ") +
            " py-4 duration-300"
          }
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="pinnedLists">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-1 w-full flex-col gap-4"
                >
                  {contentPinned}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="userLists">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-1 w-full flex-col gap-4 my-4"
                >
                  {contentLists}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
      {/* Trash lists */}
      <header
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white shadow-md shadow-zinc-500"
        onClick={() => setExpandTrash((prev) => !prev)}
      >
        <div>
          <CiTrash size={40} />
          <h2>Trash</h2>
        </div>
        <SlArrowRight
          size={25}
          className={(expandTrash ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      <section className="w-full">{contentTrash}</section>
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
