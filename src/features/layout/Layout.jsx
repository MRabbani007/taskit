import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import RadioMenu from "../navigation/RadioMenu";
import Sidebar from "../navigation/Sidebar";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("register") ||
    location.pathname.includes("logout");

  const onHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      {/* {!onAuthPage && !onHomePage ? <Sidebar /> : null} */}
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
      {/* <RadioMenu /> */}
    </>
  );
};
export default Layout;
