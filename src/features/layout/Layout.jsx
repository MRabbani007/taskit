import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import RadioMenu from "../navigation/RadioMenu";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="flex justify-center items-start flex-1">
          <Suspense fallback={<SkeletonContentPage />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <RadioMenu />
    </>
  );
};
export default Layout;
