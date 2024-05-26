import React from "react";
import { FaCircle } from "react-icons/fa6";
import { MdOutlineNextPlan } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

export default function DashboardProfile() {
  const { auth } = useAuth();

  return (
    <div className="rounded-md shadow-lg shadow-slate-400">
      <h2 className="py-2 px-4 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white rounded-t-md w-full">
        Profile
      </h2>
      <div className="p-3 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <RxAvatar className="icon-3xl" />
          <div>
            <p className="font-semibold text-xl">Hi {auth?.user}</p>
            <p className="font-light italic text-md">
              Your daily adventure starts now
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row w-full gap-3 p-3 bg-slate-300 rounded-md">
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
        <div className="flex flex-col gap-3 text-white">
          <div className="flex items-center justify-center gap-3">
            <article className="bg-green-400 rounded-md p-3 w-48 flex gap-3">
              <MdOutlineNextPlan size={32} />
              <div>
                <h3 className="font-semibold">Upcoming</h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
            <article className="bg-yellow-400 rounded-md p-3 w-48 flex gap-3">
              <TbProgressHelp size={32} />
              <div>
                <h3 className="font-semibold">In Progress</h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
          </div>
          <div className="flex items-center justify-center gap-3">
            <article className="bg-blue-400 rounded-md p-3 w-48 flex gap-3">
              <TbProgressCheck size={32} />
              <div>
                <h3 className="font-semibold">Completed</h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
            <article className="bg-red-500 rounded-md p-3 w-48 flex gap-3">
              <TbProgressX size={32} />
              <div>
                <h3 className="font-semibold">Canceled</h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
