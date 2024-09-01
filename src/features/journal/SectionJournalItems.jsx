import { useContext, useEffect, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import { Button, Flex, Timeline } from "antd";
import FormJournalEdit from "./FormJournalEdit";

const renderItems = (journal, setEditItem, sortA) => {
  const days = Array.from(new Set(journal.map((item) => item.onDate))).sort(
    (a, b) =>
      sortA === true
        ? new Date(b).getTime() - new Date(a).getTime()
        : new Date(a).getTime() - new Date(b).getTime()
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
        <div key={day.onDate} className="w-full">
          {day.groups.map((group, index) => {
            const activities = journal.filter(
              (item) => item.onDate === day.onDate && item.title === group
            );
            return (
              <div key={index}>
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

const renderLinear = (journal, setEditItem, sortA) => {
  const items = journal.sort((a, b) =>
    sortA === true
      ? new Date(b.onDate.substr(0, 10)).getTime() -
        new Date(a.onDate.substr(0, 10)).getTime()
      : new Date(a.onDate.substr(0, 10)).getTime() -
        new Date(b.onDate.substr(0, 10)).getTime()
  );

  return items.map((item) => {
    return {
      label: item?.onDate.substr(0, 10),
      color: item?.color || "green",
      children: (
        <div onClick={() => setEditItem(item)} className="w-full">
          <p className="font-semibold">{item?.title}</p>
          <p>{item?.detail}</p>
        </div>
      ),
    };
  });
};

export default function SectionJournalItems({ group, sortA }) {
  const { journal } = useContext(JournalContext);

  const [editItem, setEditItem] = useState(null);

  const items = group
    ? renderItems(journal, setEditItem, sortA)
    : renderLinear(journal, setEditItem, sortA);

  return (
    // <Timeline className="max-h-[60vh] overflow-y-scroll flex-1 w-full">
    //   {Array.isArray(journal) &&
    //     journal.map((item, index) => {
    //       return <CardJournal item={item} key={index} />;
    //     })}
    // </Timeline>
    <>
      {/* <Flex gap={16}>
        <Button type="primary" onClick={() => setGroup((curr) => !curr)}>
          {group ? "un-group" : "Group"}
        </Button>
        <Button type="primary" onClick={() => setSortA((curr) => !curr)}>
          {sortA ? "Latest" : "Earliest"}
        </Button>
      </Flex> */}
      <Timeline mode="left" items={items} className="w-fit" />
      {editItem?.id ? (
        <FormJournalEdit journalItem={editItem} setEdit={setEditItem} />
      ) : null}
    </>
  );
}
