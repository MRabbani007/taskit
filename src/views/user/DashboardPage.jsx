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
      <header className="bg-gradient-to-r from-zinc-200 to-zinc-400 text-sky-600">
        <div>
          <BsCardList size={40} />
          <h1 className="font-semibold">Dashboard</h1>
        </div>
      </header>
      <div>
        <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap justify-between gap-4">
          <div className="flex flex-row flex-wrap-reverse gap-3">
            <div className="flex-1">
              {/* Tasks */}
              <DashboardTasks />
              {/* Lists */}
              <DashboardLists />
              {/* Notes */}
              <DashboardNotes />
            </div>
            {/* Journal */}
            <DashboardJournal />
          </div>
          <DashboardProfile />
        </div>
      </div>
    </main>
  );
}
