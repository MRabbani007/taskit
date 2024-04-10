import { useContext, useState } from "react";
// Imported Components
import CardIcons from "../createTaskList/CardIcons";
import CardAddTask from "./CardAddTask";
import CardTask from "../task/CardTask";
import CardTaskBlock from "../task/CardTaskBlock";
// Imported Data
import { IMAGES_Icons } from "../../data/templates";
// Imported Media
import IMG_Close from "../../assets/close.png";
import IMG_Cancel from "../../assets/cancel.png";
import IMG_Save from "../../assets/save.png";
import IMG_Edit from "../../assets/edit.png";
import { GlobalContext } from "../../context/GlobalState";

const SectionTodoList = ({ displayList }) => {
  const {
    listTasks: tasks,
    handleUpdateList,
    handleClose,
  } = useContext(GlobalContext);

  const [editListTitle, setEditListTitle] = useState(false);
  const [editInput, setEditInput] = useState(displayList?.title);

  const [editListIcon, setEditListIcon] = useState(false);

  // Handle update list title
  const handleEditList = async () => {
    handleUpdateList(displayList?.id, "list_title", editInput);
    setEditListTitle(false);
  };

  // Handle update list icon
  const handleIcon = (icon) => {
    handleUpdateList(displayList?.id, "list_icon", icon);
    setEditListIcon(false);
  };

  return (
    <div className="w-full" key={displayList?.id}>
      {/* List Name */}
      <div className="flex justify-between items-center rounded-lg px-4 py-3 text-xl font-normal bg-neutral-400 icon-cont">
        <span className="flex items-center">
          {editListIcon ? (
            <>
              <CardIcons handleIcon={handleIcon} />
              <img
                src={IMG_Cancel}
                alt=""
                onClick={() => setEditListIcon(false)}
                className="icon"
              />
            </>
          ) : displayList?.icon === "" ? (
            <img
              src={IMAGES_Icons + "list-2.png"}
              alt=""
              className="icon"
              onClick={() => setEditListIcon(true)}
            />
          ) : (
            <img
              src={IMAGES_Icons + displayList?.icon}
              alt=""
              className="icon mr-2"
              onClick={() => setEditListIcon(true)}
            />
          )}
          {editListTitle ? (
            <input
              type="text"
              className="p-0"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          ) : (
            <p>{displayList?.title}</p>
          )}
        </span>
        <span>
          {editListTitle ? (
            <>
              <img
                src={IMG_Save}
                alt=""
                onClick={() => handleEditList()}
                className="icon"
              />
              <img
                src={IMG_Cancel}
                alt=""
                onClick={() => setEditListTitle(false)}
                className="icon"
              />
            </>
          ) : (
            <img
              src={IMG_Edit}
              alt=""
              onClick={() => setEditListTitle(true)}
              className="icon icon-item"
            />
          )}
          <img
            src={IMG_Close}
            alt=""
            onClick={() => handleClose(displayList.id)}
            className="icon"
          />
        </span>
        {/* <FaTimes  /> */}
      </div>
      {/* List Todo Items */}
      <div className="p-2">
        {/* Add new todo Item */}
        {/* Note: list ID passed from TodoList to enable opening multiple lists */}
        <CardAddTask listID={displayList.id} />
        {/* Display Todo Items */}
        <ul className="flex flex-wrap justify-center items-stretch gap-3 py-3 md:px-0">
          {Array.isArray(tasks) &&
            tasks.map((task) => {
              return <CardTaskBlock key={task.id} task={task} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SectionTodoList;
