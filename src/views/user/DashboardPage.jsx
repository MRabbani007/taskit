import React from "react";
import DashboardLists from "../../features/dashboard/DashboardLists";
import DashboardTasks from "../../features/dashboard/DashboardTasks";
import DashboardNotes from "../../features/dashboard/DashboardNotes";
import DashboardJournal from "../../features/dashboard/DashboardJournal";
import DashboardProfile from "../../features/dashboard/DashboardProfile";
import { BsCardList } from "react-icons/bs";

export default function DashboardPage() {
  return (
    <main>
      <header className="border-b-[1px] bg-zinc-100 border-blue-600 text-blue-600">
        <div>
          <BsCardList size={40} />
          <h1 className="font-light">Dashboard</h1>
        </div>
      </header>
      <div>
        <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-between gap-4">
          <div className="flex flex-row flex-wrap gap-3">
            {/* Lists */}
            <DashboardLists />
            {/* Tasks */}
            <DashboardTasks />
            {/* Journal */}
            <DashboardJournal />
            {/* Notes */}
            <DashboardNotes />
          </div>
          <DashboardProfile />
        </div>
      </div>
    </main>
  );
}
