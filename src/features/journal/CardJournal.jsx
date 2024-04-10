import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Timeline } from "flowbite-react";
import { CiCalendarDate, CiTrash } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { JournalContext } from "../../context/JournalState";

const CardJournal = ({ item }) => {
  const { handleJournalDelete } = useContext(JournalContext);

  const handleClick = () => {
    // handleOpen(task.listID);
  };

  const handleDelete = () => {
    handleJournalDelete(item);
  };

  return (
    <Timeline.Item>
      <Timeline.Point />
      <Timeline.Content className={"border-l-4 rounded-sm px-2 "}>
        <Timeline.Time>{item?.onDate.substr(0, 10)}</Timeline.Time>
        <Timeline.Title onClick={handleClick}>{item?.title}</Timeline.Title>
        <Timeline.Body>
          {item?.detail}
          <button onClick={handleDelete}>
            <CiTrash className="icon-md" />
          </button>
        </Timeline.Body>
        {/* <Button color="gray" className="m-0">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button> */}
      </Timeline.Content>
    </Timeline.Item>
  );
};

export default CardJournal;
