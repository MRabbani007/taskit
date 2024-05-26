import { Link } from "react-router-dom";
// Imported Context
// Imported Components
// Imported Icons
// Imported Media
import CardEnterEmail from "../../features/user/CardEnterEmail";
import CardEnterName from "../../features/user/CardEnterName";
import CardUserRoles from "../../features/user/CardUserRoles";

const SettingsPage = () => {
  return (
    <div className="">
      <h1>Settings</h1>
      <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
        <h2 className="text-lg mb-1">Display Settings</h2>
      </section>
      <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
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
  );
};

export default SettingsPage;
