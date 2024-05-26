import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { Button, Flex } from "antd";

export default function LayoutAdmin() {
  return (
    <div>
      <h1>Admin Page</h1>
      <Flex gap={4}>
        <Button type="primary">
          <Link to="users">Users</Link>
        </Button>
        <Button type="primary">
          <Link to="lists">Lists</Link>
        </Button>
        <Button type="primary">
          <Link to="tasks">Tasks</Link>
        </Button>
        <Button type="primary">
          <Link to="notes">Notes</Link>
        </Button>
      </Flex>
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
