import { ReactNode, useContext, useState } from "react";
// Context
import { ListContext } from "../../../context/ListState";
// Components
import CardListName from "../../../features/taskList/CardListName";
import CardListTrash from "../../../features/taskList/CardListTrash";
import Loading from "../../../features/components/Loading";
// Icons
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import FormTaskListCreate from "@/features/taskList/FormTaskListCreate";
import PageLinks from "@/features/navigation/PageLinks";
import { CiTrash } from "react-icons/ci";
import { SlArrowRight } from "react-icons/sl";
import FormTaskListEdit from "@/features/taskList/FormTaskListEdit";
import FormListIcon from "@/features/taskList/FormListIcon";

export default function UserListsPage() {
  const { userLists, pinnedLists, trashLists, status, handleSort } =
    useContext(ListContext);
  const [expandTrash, setExpandTrash] = useState(false);

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  const [editItem, setEditItem] = useState<TaskList | null>(null);

  // const handleDragEnd = (result: any) => {
  //   if (!result.destination) return;

  //   const items =
  //     result?.source.droppableId === "pinnedLists"
  //       ? Array.from(pinnedLists)
  //       : Array.from(userLists);

  //   if (result.destination.index === result.source.index) return;

  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   handleSort(result?.source.droppableId, items);
  // };

  let contentLists: ReactNode;
  let contentPinned: ReactNode;
  let contentTrash;

  const Skeleton = ({ count }: { count: number }) =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-4 animate-pulse min-h-[120px]"
      ></div>
    ));

  if (status?.isLoading === true) {
    contentLists = (
      <>
        <Skeleton count={8} />
      </>
    );
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
          // <Draggable key={list.id} draggableId={list.id} index={index}>
          //   {(provided) => (
          //     <div
          //       ref={provided.innerRef}
          //       {...provided.draggableProps}
          //       {...provided.dragHandleProps}
          //     >
          <CardListName
            key={index}
            taskList={list}
            setEdit={setEdit}
            setEditIcon={setEditIcon}
            setEditItem={setEditItem}
          />
          //     </div>
          //   )}
          // </Draggable>
        );
      });
      contentLists = userLists.map((list, index) => {
        return (
          // <Draggable key={list.id} draggableId={list.id} index={index}>
          //   {(provided) => (
          //     <div
          //       ref={provided.innerRef}
          //       {...provided.draggableProps}
          //       {...provided.dragHandleProps}
          //     >
          <CardListName
            key={index}
            taskList={list}
            setEdit={setEdit}
            setEditIcon={setEditIcon}
            setEditItem={setEditItem}
          />
          //     </div>
          //   )}
          // </Draggable>
        );
      });
    }
    if (trashLists.length === 0) {
      contentTrash = (
        <p className="font-medium text-zinc-800 px-4">No lists in trash</p>
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
    <main className="">
      <div className="pt-4 pb-8 px-2 flex flex-col items-start rounded-xl bg-gradient-to-r from-sky-800 to-blue-950 shadow-md shadow-zinc-500">
        <header className="text-white gap-4 py-2 px-4 self-stretch">
          {/* <BsCardList size={40} /> */}
          <div className="flex-1">
            <h1 className="py-1 px-4 bg-white/20 rounded-lg w-fit">Lists</h1>
          </div>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() => setAdd(true)}
          >
            <BiPlus size={30} />
          </button>
        </header>
        <PageLinks />
      </div>
      <section
        className={
          " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-300"
        }
      >
        {contentPinned}
        {contentLists}
        {status?.isSuccess === true && (
          <button
            onClick={() => setAdd(true)}
            className="flex flex-col items-center justify-center text-center bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-lg p-4 group"
          >
            <BiPlus size={40} className="group-hover:scale-125 duration-200" />
          </button>
        )}
        {/* <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pinnedLists">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {contentPinned}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
        {/* <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="userLists">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {contentLists}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </section>
      <header
        className="py-2 px-4 bg-gradient-to-r from-stone-800 to-stone-950 text-white gap-4 rounded-lg"
        onClick={() => setExpandTrash((prev) => !prev)}
      >
        <CiTrash size={30} />
        <h2 className="flex-1">Trash</h2>
        <SlArrowRight
          size={20}
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
      {/* <Link to={"/myLists/createList"}>
        <FloatButton
          type="primary"
          tooltip="Create New List"
          icon={<PlusOutlined />}
          style={{ right: 94 }}
        />
      </Link> */}
      {add && <FormTaskListCreate show={add} setShow={setAdd} />}
      {edit && editItem && (
        <FormTaskListEdit taskList={editItem} edit={edit} setEdit={setEdit} />
      )}
      {editIcon && editItem && (
        <FormListIcon list={editItem} edit={editIcon} setEdit={setEditIcon} />
      )}
    </main>
  );
}
