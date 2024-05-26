import { Button, Flex } from "antd";
import AdminUsers from "./AdminUsers";
import { Link } from "react-router-dom";
import SignOut from "../../features/auth/SignOut";

const AdminPage = () => {
  return (
    <div className="">
      <AdminUsers />
      <SignOut />
      {/* <AdminTasks /> */}
    </div>
  );
};

export default AdminPage;
