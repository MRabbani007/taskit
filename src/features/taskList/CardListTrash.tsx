import { useContext } from "react";
// Data
import { IMAGES_Icons } from "../../data/templates";
// AntD
import { Button, Popconfirm, message } from "antd";
import { LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { ListContext } from "../../context/ListState";

export default function CardListTrash({ list }: { list: TaskList }) {
  const { handleUpdateList, handleRemoveList } = useContext(ListContext);

  const handleUntrash = () => {
    handleUpdateList({ ...list, trash: false });
    message.success("List restored");
  };

  const handleDelete = () => {
    handleRemoveList(list.id);
    message.success("List Deleted");
  };

  return (
    <li className="flex items-center justify-between py-1 px-4 shadow-sm shadow-slate-600 rounded-md group">
      <div className="flex items-center gap-2">
        <img src={IMAGES_Icons + list?.icon} className="icon-lg" />
        <span>{list.title}</span>
      </div>
      <span className="flex items-center ml-2 invisible group-hover:visible">
        <Popconfirm
          title="Recover List"
          description="Recover list?"
          onConfirm={handleUntrash}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <Button
            type="text"
            className="flex items-center justify-center m-0 p-1"
          >
            <LiaTrashRestoreSolid className="icon text-green-600" />
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Delete List"
          description="Are you sure you want to delete this list?"
          onConfirm={handleDelete}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <Button
            type="text"
            className="flex items-center justify-center m-0 p-1"
          >
            <LiaTrashSolid className="icon text-red-600" />
          </Button>
        </Popconfirm>
      </span>
    </li>
  );
}
