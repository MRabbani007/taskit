import { useContext } from "react";
import { JournalContext } from "../../context/JournalState";
import { Timeline } from "flowbite-react";
import CardJournal from "./CardJournal";

const SectionJournalItems = () => {
  const { journal } = useContext(JournalContext);

  return (
    <div>
      <Timeline className="max-h-[60vh] overflow-y-scroll">
        {journal.map((item, index) => {
          return <CardJournal item={item} key={index} />;
        })}
      </Timeline>
    </div>
  );
};

export default SectionJournalItems;
