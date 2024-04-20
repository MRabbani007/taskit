import { useContext } from "react";
// Imported Context
import { GlobalContext } from "../context/GlobalState";
import { RxAvatar } from "react-icons/rx";
import useAuth from "../hooks/useAuth";
import { MdOutlineNextPlan } from "react-icons/md";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";
import { FaCircle } from "react-icons/fa6";
import { IMAGES_Icons } from "../data/templates";
// Imported Components

const HomePage = () => {
  const { listNames, notes } = useContext(GlobalContext);
  const { auth } = useAuth();

  return (
    <div className="flex flex-wrap flex-1 gap-3 justify-center">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        {/* Lists */}
        <article className="w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
          <h2 className="border-b-2 p-2 bg-zinc-700 text-zinc-100 rounded-t-md">
            My Lists
          </h2>
          <div className="p-2 flex justify-evenly items-center">
            <span className="bg-orange-600 text-zinc-50 p-2 rounded-md w-[45%] text-center">
              8 Lists
            </span>
            <span className="bg-yellow-600 text-zinc-50 p-2 rounded-md w-[45%] text-center">
              35 tasks
            </span>
          </div>
          <ul className="flex gap-1 flex-wrap p-0 justify-center pb-2">
            {listNames.slice(0, 8).map((list, index) => {
              return (
                <li
                  key={index}
                  className="w-[45%] bg-slate-300 rounded-md p-2 flex items-center gap-2"
                >
                  <img
                    src={IMAGES_Icons + list?.icon}
                    alt="icon"
                    className="icon-md"
                  />
                  <span>{list?.title}</span>
                </li>
              );
            })}
            <li className="w-full mx-3 bg-slate-300 rounded-md py-1 px-2 flex items-center gap-2">
              Show More
            </li>
          </ul>
        </article>
        {/* Tasks */}
        <article className="w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
          <h2 className="border-b-2 p-2 bg-blue-700 text-blue-100 rounded-t-md">
            My Tasks
          </h2>
          <div className="flex flex-col gap-2 p-2">
            <p className="shadow-md shadow-slate-400 bg-slate-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span className="w-20">Today</span>
              <span className="w-12">10</span>
            </p>
            <p className="shadow-md shadow-slate-400 bg-slate-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span className="w-20">This Week</span>
              <span className="w-12">10</span>
            </p>
            <p className="shadow-md shadow-slate-400 bg-slate-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span className="w-20">Important</span>
              <span className="w-12">10</span>
            </p>
            <p className="shadow-md shadow-slate-400 bg-slate-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span>Completed</span>
              <span className="w-12">10</span>
            </p>
            <p className="shadow-md shadow-slate-400 bg-slate-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span className="w-20">Overdue</span>
              <span className="w-12">10</span>
            </p>
            <p className="shadow-md shadow-slate-400 bg-yellow-200 rounded-md py-1 px-2 flex items-center justify-evenly">
              <span className="w-20">Total</span>
              <span className="w-12">47</span>
            </p>
          </div>
        </article>
        {/* Notes */}
        <article className="w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
          <h2 className="border-b-2 p-2 bg-yellow-400 text-yellow-50 rounded-t-md">
            Notes
          </h2>
          <div className="p-2">
            <ul className="flex flex-wrap justify-center gap-2">
              {notes.slice(0, 8).map((note, index) => {
                return (
                  <li
                    key={index}
                    className="w-[45%] bg-slate-300 rounded-md p-2 flex items-center gap-2"
                  >
                    {note.title}
                  </li>
                );
              })}
              <li className="w-full mx-3 bg-slate-300 rounded-md py-1 px-2 flex items-center gap-2">
                Show More
              </li>
            </ul>
          </div>
        </article>
        {/* Journal */}
        <article className="w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
          <h2 className="border-b-2 p-2 bg-green-700 text-green-100 rounded-t-md">
            Journal
          </h2>
          <div className="p-2 flex justify-evenly items-center">
            <span>Add activities for today</span>
          </div>
        </article>
      </div>
      <div className="rounded-md shadow-lg shadow-slate-400">
        <h2 className="p-2 bg-indigo-700 text-indigo-100 rounded-t-md w-full">
          Profile
        </h2>
        <div className="p-3 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <RxAvatar className="icon-3xl" />
            <div>
              <p className="font-semibold">Hi {auth?.user}</p>
              <p className="font-light italic text-sm">
                Your daily adventure starts now
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-slate-300 rounded-md">
            <h3 className="font-semibold">Current Focus</h3>
            <ul className="">
              <li className="flex justify-between items-center gap-3">
                <span>NextJS</span>
                <span className="text-slate-400 flex gap-1">
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm" />
                  <FaCircle className="icon-sm" />
                  <FaCircle className="icon-sm" />
                </span>
              </li>
              <li className="flex justify-between items-center gap-3">
                <span>NestJs</span>
                <span className="text-slate-400 flex gap-1">
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm " />
                  <FaCircle className="icon-sm" />
                  <FaCircle className="icon-sm" />
                  <FaCircle className="icon-sm" />
                </span>
              </li>
              <li className="flex justify-between items-center gap-3">
                <span>HTTP Protocols</span>
                <span className="text-slate-400 flex gap-1">
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm text-green-500" />
                  <FaCircle className="icon-sm" />
                  <FaCircle className="icon-sm" />
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <article className="bg-green-400 rounded-md p-3 w-48 flex gap-3">
                <MdOutlineNextPlan className="icon" />
                <div>
                  <h3 className="font-semibold">Upcoming</h3>
                  <p className="font-light">12 Tasks</p>
                </div>
              </article>
              <article className="bg-yellow-400 rounded-md p-3 w-48 flex gap-3">
                <TbProgressHelp className="icon" />
                <div>
                  <h3 className="font-semibold">In Progress</h3>
                  <p className="font-light">12 Tasks</p>
                </div>
              </article>
            </div>
            <div className="flex items-center justify-center gap-3">
              <article className="bg-blue-400 rounded-md p-3 w-48 flex gap-3">
                <TbProgressCheck className="icon" />
                <div>
                  <h3 className="font-semibold">Completed</h3>
                  <p className="font-light">12 Tasks</p>
                </div>
              </article>
              <article className="bg-red-400 rounded-md p-3 w-48 flex gap-3">
                <TbProgressX className="icon" />
                <div>
                  <h3 className="font-semibold">Canceled</h3>
                  <p className="font-light">12 Tasks</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
