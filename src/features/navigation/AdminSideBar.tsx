import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";

export default function AdminSideBar() {
  return (
    <div className="flex flex-col bg-cyan-950 text-zinc-300">
      <Link to={"/admin"} className="p-4">
        <LuLayoutDashboard size={25} />
      </Link>
      <Link to={"/admin/users"} className="p-4">
        <FiUsers size={25} />
      </Link>
    </div>
  );
}
