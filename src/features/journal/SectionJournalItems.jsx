import { useContext, useEffect, useState } from "react";
import { JournalContext } from "../../context/JournalState";
// import { Timeline } from "flowbite-react";
import CardJournal from "./CardJournal";
import { Timeline } from "antd";
import FormJournalEdit from "./FormJournalEdit";

const renderItems = (journal) => {
  const days = Array.from(new Set(journal.map((item) => item.onDate))).sort(
    (a, b) => a.toString().localeCompare(b.toString())
  );

  const groups = days.map((day) => {
    return {
      onDate: day,
      groups: Array.from(
        new Set(
          journal
            .filter((item) => item.onDate === day)
            .map((item) => item.title)
        )
      ),
    };
  });

  const items = groups.map((day) => {
    return {
      label: day.onDate.substr(0, 10),
      color: "green",
      children: (
        <div key={day.onDate}>
          {day.groups.map((group, index) => {
            const activities = journal.filter(
              (item) => item.onDate === day.onDate && item.title === group
            );
            return (
              <div key={index} className="my-2">
                <p className="font-semibold">{group}</p>
                <ul className="px-2">
                  {activities.map((activity, idx) => {
                    return <li key={idx}>{activity.detail}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ),
    };
  });

  return items;
};

const SectionJournalItems = () => {
  const { journal } = useContext(JournalContext);

  const [editItem, setEditItem] = useState(false);

  const items = renderItems(journal);
  console.log(items);
  return (
    // <Timeline className="max-h-[60vh] overflow-y-scroll flex-1 w-full">
    //   {Array.isArray(journal) &&
    //     journal.map((item, index) => {
    //       return <CardJournal item={item} key={index} />;
    //     })}
    // </Timeline>
    <>
      <Timeline mode="left" items={items} className="w-full" />
      {editItem?.id ? (
        <FormJournalEdit journalItem={editItem} setEdit={setEditItem} />
      ) : null}
    </>
  );
};

export default SectionJournalItems;
