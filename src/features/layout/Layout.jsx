import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import BottomMenu from "./BottomMenu";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import RadioMenu from "../navigation/RadioMenu";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Sidebar />
        <div className="flex justify-center items-start flex-1">
          <Suspense fallback={<SkeletonContentPage />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <RadioMenu />
      {/* <BottomMenu /> */}
    </>
  );
};
export default Layout;
