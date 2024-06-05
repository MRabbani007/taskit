import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import RadioMenu from "../navigation/RadioMenu";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Sidebar from "../navigation/Sidebar";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="flex gap-2 items-stretch justify-start">
        <Sidebar />
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
      <RadioMenu />
    </>
  );
};
export default Layout;
