import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { Button, Progress } from "antd";
import { green, red, blue } from "@ant-design/colors";
import { ActivityContext } from "../../../context/ActivityState";
import FormActivityTaskAdd from "../../../features/activities/FormActivityTaskAdd";
import ActivityTask from "../../../features/activities/ActivityTask";

export default function ActivityDetailsPage() {
  const {
    activities,
    openActivity: activity,
    handleOpenActivity,
  } = useContext(ActivityContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    if (!activity?.id) {
      handleOpenActivity(id);
    }
  }, [activities, activity]);

  const progress = {
    steps: activity?.tasks.length,
    completed: activity?.tasks.reduce(
      (acc, curr) => (acc += curr.completed === true ? 1 : 0),
      0
    ),
  };

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-amber-900 to-amber-900 text-white gap-4">
        <BsCardList size={40} />
        <h1 className="font-normal">{activity?.title}</h1>
      </header>
      <div className="items-start">
        <Progress
          percent={(progress.completed / progress.steps) * 100}
          steps={{
            count: progress.steps,
            gap: 4,
          }}
          strokeWidth={16}
          success={{
            percent: 40,
          }}
          strokeColor={[red[4], green[4], blue[5]]}
          trailColor="rgba(0, 0, 0, 0.06)"
        />
        <div className="p-4">
          <ol className="list-decimal list-inside flex flex-col gap-2">
            {Array.isArray(activity?.tasks) &&
              activity?.tasks.map((item, index) => {
                return <ActivityTask key={index} task={item} />;
              })}
          </ol>
        </div>
        <Button type="primary" onClick={() => setAddTask(true)}>
          Add Task
        </Button>
        <FormActivityTaskAdd
          activity={activity}
          addTask={addTask}
          setAddTask={setAddTask}
        />
      </div>
    </main>
  );
}
