import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import { IoCloseCircle } from "react-icons/io5";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  // const location = useLocation();

  // const onAuthPage =
  //   location.pathname.includes("login") ||
  //   location.pathname.includes("register") ||
  //   location.pathname.includes("logout");

  // const onHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <ErrorBoundary
        fallback={
          <main className="flex flex-1 items-center">
            <div className="flex items-center gap-2 bg-red-500 text-white font-semibold rounded-md p-4 w-fit mx-auto my-auto">
              <IoCloseCircle size={40} className="" />
              <span>Something went wrong</span>
            </div>
          </main>
        }
      >
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer autoClose={1000} />
      <Toaster />
    </div>
  );
}
