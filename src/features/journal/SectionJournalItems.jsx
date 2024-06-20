import { useContext, useEffect, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import { Button, Timeline } from "antd";
import FormJournalEdit from "./FormJournalEdit";

const renderItems = (journal, setEditItem) => {
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
                    return (
                      <li key={idx} onClick={() => setEditItem(activity)}>
                        {activity.detail}
                      </li>
                    );
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

const renderLinear = (journal, setEditItem) => {
  return journal.map((item) => {
    return {
      label: item?.onDate.substr(0, 10),
      color: item?.color || "green",
      children: (
        <div onClick={() => setEditItem(item)}>
          <p className="font-semibold">{item?.title}</p>
          <p>{item?.detail}</p>
        </div>
      ),
    };
  });
};

export default function SectionJournalItems() {
  const { journal } = useContext(JournalContext);

  const [group, setGroup] = useState(true);

  const [editItem, setEditItem] = useState(null);

  const items = group
    ? renderItems(journal, setEditItem)
    : renderLinear(journal, setEditItem);

  return (
    // <Timeline className="max-h-[60vh] overflow-y-scroll flex-1 w-full">
    //   {Array.isArray(journal) &&
    //     journal.map((item, index) => {
    //       return <CardJournal item={item} key={index} />;
    //     })}
    // </Timeline>
    <>
      <Button type="primary" onClick={() => setGroup((curr) => !curr)}>
        {group ? "un-group" : "Group"}
      </Button>
      <Timeline mode="left" items={items} className="w-full" />
      {editItem?.id ? (
        <FormJournalEdit journalItem={editItem} setEdit={setEditItem} />
      ) : null}
    </>
  );
}
