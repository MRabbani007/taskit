import React from "react";
import { FaCircle } from "react-icons/fa6";
import { MdOutlineNextPlan } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

export default function DashboardProfile() {
  const { auth } = useAuth();

  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className="py-2 px-4 bg-gradient-to-br from-indigo-400 to-indigo-200 text-zinc-800 w-full">
        Profile
      </h2>
      <div className="py-3 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3"></div>

        <div className="flex flex-col gap-3 text-white">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <article className="bg-yellow-400 p-3 w-48 flex-1 flex gap-3">
              <TbProgressHelp size={32} />
              <div>
                <h3 className="font-semibold"></h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <article className=" p-3 w-48 flex-1 flex gap-3">
              <TbProgressCheck size={32} />
              <div>
                <h3 className="font-semibold"></h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
            <article className=" p-3 w-48 flex-1 flex gap-3">
              <TbProgressX size={32} />
              <div>
                <h3 className="font-semibold"></h3>
                <p className="font-light">12 Tasks</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
