import { useContext } from "react";
import { Timeline } from "flowbite-react";
import { CiTrash } from "react-icons/ci";
import { JournalContext } from "../../context/JournalState";

export default function CardJournal({ item }: { item: JournalItem }) {
  const { handleJournalDelete } = useContext(JournalContext);

  const handleClick = () => {};

  const handleDelete = () => {
    handleJournalDelete(item.id);
  };

  return (
    <Timeline.Item>
      <Timeline.Point />
      <Timeline.Content className={"border-l-4 rounded-sm px-2 "}>
        <Timeline.Time>{item?.onDate.toString().substr(0, 10)}</Timeline.Time>
        <Timeline.Title onClick={handleClick}>{item?.title}</Timeline.Title>
        <Timeline.Body>
          {item?.detail}
          <button onClick={handleDelete}>
            <CiTrash className="icon-md" />
          </button>
        </Timeline.Body>
      </Timeline.Content>
    </Timeline.Item>
  );
}
