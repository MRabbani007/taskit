import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import BottomMenu from "./BottomMenu";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomMenu />
    </>
  );
};
export default Layout;
