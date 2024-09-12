import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { Button, Flex } from "antd";
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
