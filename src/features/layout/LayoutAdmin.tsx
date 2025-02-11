import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { AdminProvider } from "@/context/AdminContext";
import AdminSideBar from "../navigation/AdminSideBar";

export default function LayoutAdmin() {
  return (
    <div className="flex items-stretch justify-center w-full flex-1 bg-gray-950">
      <AdminSideBar />
      <AdminProvider>
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </AdminProvider>
    </div>
  );
}
