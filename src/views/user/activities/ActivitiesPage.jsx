import React, { useContext } from "react";
import { BsCardList } from "react-icons/bs";
import ActivityCard from "../../../features/activities/ActivityCard";
import { ActivityContext } from "../../../context/ActivityState";

export default function ActivitiesPage() {
  const { activities, status } = useContext(ActivityContext);

  let content;

  if (status?.isLoading === true) {
    content = <p>Loading...</p>;
  } else if (status?.isError === true) {
    content = <p>Error Loading Activities</p>;
  } else if (status?.isSuccess === true) {
    content =
      Array.isArray(activities) && activities.length !== 0 ? (
        activities.map((item, index) => (
          <ActivityCard activity={item} key={index} />
        ))
      ) : (
        <p>No activities yet, create new activitiy</p>
      );
  }

  return (
    <main>
      <header>
        <BsCardList size={40} />
        <h1 className="font-normal">Activities</h1>
      </header>
      <div className="flex flex-wrap flex-col sm:flex-row gap-4 items-start w-full">
        {content}
      </div>
    </main>
  );
}
