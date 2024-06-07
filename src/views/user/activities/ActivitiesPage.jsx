import React, { useContext } from "react";
import { BsCardList } from "react-icons/bs";
import ActivityCard from "../../../features/activities/ActivityCard";
import { ActivityContext } from "../../../context/ActivityState";

export default function ActivitiesPage() {
  const { activities } = useContext(ActivityContext);

  return (
    <main>
      <header className="border-b-[1px] bg-zinc-100 border-blue-600 text-blue-600">
        <div>
          <BsCardList size={40} />
          <h1 className="font-light">Activities</h1>
        </div>
      </header>
      <div className="flex flex-row gap-4 items-start w-full">
        {Array.isArray(activities) && activities.length === 0 ? (
          <p>No activities yet, create new activitiy</p>
        ) : (
          activities.map((item, index) => (
            <ActivityCard activity={item} key={index} />
          ))
        )}
      </div>
    </main>
  );
}
