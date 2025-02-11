import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { BiEdit } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";

export default function CardAdminUser({
  user,
  setEdit,
  setEditItem,
}: {
  user: User;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<User | null>>;
}) {
  return (
    <div className="flex items-center gap-4 bg-cyan-900 rounded-lg text-zinc-300 py-2 px-4">
      <FaRegCircleUser size={30} />
      <div>
        <p className="text-xl font-semibold text-zinc-100">{user?.username}</p>
        <p className="text-zinc-300">
          <span>{user?.firstname}</span>
          <span>{user?.lastname}</span>
        </p>
        <p>{user?.email}</p>
        <p className="text-sm text-zinc-400">
          {format(user?.createDate.toString().substring(0, 10), "EEEE dd MMM")}
        </p>
      </div>
      <button
        onClick={() => {
          setEdit(true);
          setEditItem(user);
        }}
        className="ml-auto"
      >
        <BiEdit size={25} />
      </button>
    </div>
  );
}
