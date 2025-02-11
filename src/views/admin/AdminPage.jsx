import { Button, Flex } from "antd";
import AdminUsers from "./AdminUsersPage";
import { Link } from "react-router-dom";
import SignOut from "../../features/auth/SignOut";
import { LuLayoutDashboard } from "react-icons/lu";

export default function AdminPage() {
  return (
    <main className="flex-1 text-zinc-100 flex flex-col">
      <header className="bg-teal-900 rounded-md text-zinc-100 py-2 px-4">
        <LuLayoutDashboard size={30} />
        <h1 className="font-semibold">Dashboard</h1>
      </header>
      <div className="flex-1">Dashboard</div>
    </main>
  );
}
