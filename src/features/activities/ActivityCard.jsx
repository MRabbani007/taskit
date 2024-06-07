import React, { useContext } from "react";
import { Progress } from "antd";
import { green, red, blue } from "@ant-design/colors";
import { CiLock, CiShare2 } from "react-icons/ci";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ActivityContext } from "../../context/ActivityState";

export default function ActivityCard({ activity }) {
  const { handleOpenActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const handleOpen = () => {
    handleOpenActivity(activity?.id);

    navigate({
      pathname: "/activities/activity",
      search: createSearchParams({
        id: activity.id,
        title: activity.title,
      }).toString(),
    });
  };

  const progress = {
    steps: activity?.tasks.length,
    completed: activity?.tasks.reduce(
      (acc, curr) => (acc += curr.completed === true ? 1 : 0),
      0
    ),
  };

  return (
    <div className="border-2 border-zinc-400 max-w-[400px]">
      <div className="bg-zinc-100 p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 ">
          <h2 className="cursor-pointer" onClick={handleOpen}>
            {activity?.title}
          </h2>
          {activity?.shared === false ? (
            <CiLock size={25} />
          ) : (
            <CiShare2 size={25} />
          )}
        </div>
        <Progress
          // type="dashboard"
          percent={(progress.completed / progress.steps) * 100}
          steps={{
            count: progress.steps,
            gap: 4,
          }}
          strokeWidth={16}
          success={{
            percent: 40,
          }}
          // strokeColor={{
          //   "0%": "#108ee9",
          //   "100%": "#87d068",
          // }}
          strokeColor={[red[4], green[4], blue[5]]}
          trailColor="rgba(0, 0, 0, 0.06)"
        />
      </div>
      <div className="p-4">
        <ol className="list-decimal list-inside flex flex-col gap-2">
          {Array.isArray(activity?.tasks) &&
            activity.tasks.map((item, index) => {
              return (
                <li key={index} className="">
                  {item?.title}
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
