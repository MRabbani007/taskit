import React, { Suspense } from "react";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { Outlet } from "react-router-dom";
import RadioMenu from "../navigation/RadioMenu";
import Sidebar from "../navigation/Sidebar";

export default function LayoutUser() {
  return (
    <>
      <div className="flex gap-2 items-stretch justify-center">
        <Sidebar />
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
      <RadioMenu />
    </>
  );
}
