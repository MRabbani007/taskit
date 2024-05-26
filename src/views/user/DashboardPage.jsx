import React from "react";
import DashboardLists from "../../features/dashboard/DashboardLists";
import DashboardTasks from "../../features/dashboard/DashboardTasks";
import DashboardNotes from "../../features/dashboard/DashboardNotes";
import DashboardJournal from "../../features/dashboard/DashboardJournal";
import DashboardProfile from "../../features/dashboard/DashboardProfile";

export default function DashboardPage() {
  return (
    <div className="flex flex-wrap flex-1 gap-3 justify-center">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        {/* Lists */}
        <DashboardLists />
        {/* Tasks */}
        <DashboardTasks />
        {/* Notes */}
        <DashboardNotes />
        {/* Journal */}
        <DashboardJournal />
      </div>
      <DashboardProfile />
    </div>
  );
}
