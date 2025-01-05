import DashboardLists from "../../features/dashboard/DashboardLists";
import DashboardTasks from "../../features/dashboard/DashboardTasks";
import DashboardNotes from "../../features/dashboard/DashboardNotes";
import DashboardJournal from "../../features/dashboard/DashboardJournal";
import useAuth from "../../hooks/useAuth";
import CurrentFocusCard from "../../features/dashboard/CurrentFocusCard";
import PlannerSummaryCard from "../../features/dashboard/PlannerSummaryCard";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function DashboardPage() {
  const { auth } = useAuth();

  return (
    <main>
      <header className="py-2 ">
        <Badge count={10} dot={false}>
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
        </Badge>
        <div>
          <p className="font-semibold text-xl">Hi {auth?.user}</p>
          <p className="font-light italic text-sm">
            Your daily adventure starts here
          </p>
        </div>
      </header>
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4">
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
