import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import RadioMenu from "../navigation/RadioMenu";
import Sidebar from "../navigation/Sidebar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import { ErrorBoundary } from "react-error-boundary";
import { IoCloseCircle } from "react-icons/io5";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("register") ||
    location.pathname.includes("logout");

  const onHomePage = location.pathname === "/";

  return (
    <>
      <ErrorBoundary
        fallback={
          <div className="flex w-full h-screen items-center bg-zinc-100">
            <div className="flex items-center gap-2 bg-red-500 text-white font-semibold rounded-md p-4 w-fit mx-auto my-auto">
              <IoCloseCircle size={40} className="" />
              <span>Something went wrong</span>
            </div>
          </div>
        }
      >
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
