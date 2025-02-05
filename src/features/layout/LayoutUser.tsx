import { Suspense } from "react";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { Outlet } from "react-router-dom";
import RadioMenu from "../navigation/RadioMenu";
import Sidebar from "../navigation/Sidebar";

export default function LayoutUser() {
  return (
    <div className="flex-1 flex items-stretch justify-center">
      {/* <Sidebar /> */}
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
      <RadioMenu />
    </div>
  );
}
