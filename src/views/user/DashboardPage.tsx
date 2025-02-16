import DashboardLists from "../../features/dashboard/DashboardLists";
import DashboardTasks from "../../features/dashboard/DashboardTasks";
import DashboardNotes from "../../features/dashboard/DashboardNotes";
import DashboardJournal from "../../features/dashboard/DashboardJournal";
import { Badge } from "antd";
import CardDate from "@/features/dashboard/CardDate";
import { useContext } from "react";
import { UserContext } from "@/context/UserState";
import { Link } from "react-router-dom";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";

export default function DashboardPage() {
  const { userProfile } = useContext(UserContext);

  return (
    <main className="bg-amber-900/20">
      <div className="flex justify-between">
        <header className="py-2 gap-4">
          <Badge count={10} dot={false}>
            <div className="bg-white shadow-md shadow-zinc-500 rounded-full overflow-clip">
              <img
                src={userProfile?.profileImage}
                className="w-16 h-16 object-center scale-125"
              />
            </div>
          </Badge>
          <div>
            <Link to={"/user/profile"}>
              <p className="font-semibold text-xl">
                Hi {userProfile?.firstname},
              </p>
            </Link>
            <p className=" italic text-sm text-stone-600">
              Your daily adventure starts here
            </p>
          </div>
        </header>
        <CardDate />
      </div>
      <div className="p-4 bg-white rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold text-lg">
                {userProfile?.careerTrade}
              </span>
            </p>
            <button className="p-2 bg-orange-50 rounded-full text-zinc-600">
              <IoCallOutline size={20} />
            </button>
            <button className="p-2 bg-sky-50 rounded-full text-zinc-600">
              <IoMailOutline size={20} />
            </button>
          </div>
          {/* <p>
            <span className="text-zinc-600">{userProfile?.phoneNumber}</span>
            <span>, </span>
            <span className="italic text-blue-500">
              {userProfile?.profileEmail}
            </span>
          </p> */}
        </div>
        <p className="text-stone-700 mt-2">{userProfile?.bio}</p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {/* <CurrentFocusCard /> */}

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
