import React from "react";
import DashboardLists from "../../features/dashboard/DashboardLists";
import DashboardTasks from "../../features/dashboard/DashboardTasks";
import DashboardNotes from "../../features/dashboard/DashboardNotes";
import DashboardJournal from "../../features/dashboard/DashboardJournal";
import useAuth from "../../hooks/useAuth";
import { RxAvatar } from "react-icons/rx";
import CurrentFocusCard from "../../features/dashboard/CurrentFocusCard";
import PlannerSummaryCard from "../../features/dashboard/PlannerSummaryCard";

export default function DashboardPage() {
  const { auth } = useAuth();

  return (
    <main>
      <header>
        <RxAvatar size={40} />
        <div>
          <p className="font-semibold text-xl">Hi {auth?.user}</p>
          <p className="font-light italic text-sm">
            Your daily adventure starts here
          </p>
        </div>
      </header>
      <div className="flex flex-row flex-wrap-reverse lg:flex-nowrap gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <CurrentFocusCard />
          <PlannerSummaryCard />
          <DashboardTasks />
          <DashboardLists />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <DashboardJournal />
          <DashboardNotes />
        </div>
      </div>
    </main>
  );
}
