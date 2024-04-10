import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Timeline } from "flowbite-react";
import { CiCalendarDate } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";

const CardTaskTimeLine = ({ task }) => {
  const { handleOpen } = useContext(GlobalContext);

  const handleClick = () => {
    handleOpen(task.listID);
  };

  const borderColor =
    task?.priority === "high"
      ? "border-red-600"
      : task.priority === "normal"
      ? "border-yellow-400"
      : "border-green-400";

  return (
    <Timeline.Item>
      <Timeline.Point />
      <Timeline.Content className={"border-l-4 rounded-sm px-2 " + borderColor}>
        <Timeline.Time>{task?.dueDate.substr(0, 10)}</Timeline.Time>
        <Timeline.Title onClick={handleClick}>{task.title}</Timeline.Title>
        <Timeline.Body>{task.details}</Timeline.Body>
        {/* <Button color="gray" className="m-0">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button> */}
      </Timeline.Content>
    </Timeline.Item>
  );
};

export default CardTaskTimeLine;
