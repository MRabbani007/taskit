import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { ActivityProvider } from "../../context/ActivityState";

export default function LayoutActivities() {
  return (
    <ActivityProvider>
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </ActivityProvider>
  );
}
