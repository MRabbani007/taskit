import { Link } from "react-router-dom";
// Imported Context
// Imported Components
// Imported Icons
// Imported Media
import CardEnterEmail from "../../features/user/CardEnterEmail";
import CardEnterName from "../../features/user/CardEnterName";
import CardUserRoles from "../../features/user/CardUserRoles";
import { IoSettingsOutline } from "react-icons/io5";

const SettingsPage = () => {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-200 to-zinc-400 text-sky-600">
        <div>
          <IoSettingsOutline size={40} />
          <h1 className="font-semibold">Settings</h1>
        </div>
      </header>
      <div>
        <section className="border-2 border-slate-400 rounded-lg p-3 my-3 w-full">
          <h2 className="text-lg mb-1">Display Settings</h2>
          <div className="flex flex-col gap-1">
            <p>Tasks</p>
            <p>Show completed</p>
            <p>Sort by</p>
          </div>
        </section>
        <section className="border-2 border-slate-400 rounded-lg p-3 my-3 w-full">
          <h2 className="text-lg mb-1">Account</h2>
          <div className="flex flex-col gap-1">
            <CardEnterName />
            <CardEnterEmail />
            <CardUserRoles />
            <Link to="/changePWD" className="btn btn-red">
              Change Password
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SettingsPage;
