import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";

export default function LayoutAdmin() {
  return (
    <div className="flex items-stretch justify-center gap-2 w-full flex-1 border-2">
      <Sidebar />
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
