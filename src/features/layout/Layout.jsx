import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import RadioMenu from "../navigation/RadioMenu";
import SidebarUserTasks from "../navigation/SidebarUserTasks";

const Layout = () => {
  const location = useLocation();

  const istasksPage =
    location.pathname.split("/").includes("tasks") ||
    location.pathname.split("/").includes("tasklist");

  return (
    <>
      <Navbar />
      <div className="page-container">
        {/* <Sidebar /> */}
        {istasksPage && <SidebarUserTasks />}
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
