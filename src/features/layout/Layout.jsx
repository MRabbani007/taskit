import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import RadioMenu from "../navigation/RadioMenu";
import Sidebar from "../navigation/Sidebar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import { ErrorBoundary } from "react-error-boundary";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("register") ||
    location.pathname.includes("logout");

  const onHomePage = location.pathname === "/";

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Navbar />
        {/* {!onAuthPage && !onHomePage ? <Sidebar /> : null} */}
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
        <Footer />
        <ToastContainer autoClose={1000} />
        {/* <RadioMenu /> */}
      </ErrorBoundary>
    </>
  );
};
export default Layout;
