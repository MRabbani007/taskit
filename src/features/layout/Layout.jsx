import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default Layout;
