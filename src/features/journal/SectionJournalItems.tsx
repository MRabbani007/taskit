import { Dispatch, SetStateAction, useContext, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import { Timeline } from "antd";
import FormJournalEdit from "./FormJournalEdit";

const renderItems = (
  journal: JournalItem[],
  setEdit: Dispatch<SetStateAction<boolean>>,
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>,
  sortA: boolean
) => {
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
      label: day.onDate.toString().substr(0, 10),
      color: "green",
      children: (
        <div key={day.onDate.toString()} className="w-full">
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
                      <li
                        key={idx}
                        onClick={() => {
                          setEdit(true);
                          setEditItem(activity);
                        }}
                      >
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

const renderLinear = (
  journal: JournalItem[],
  setEdit: Dispatch<SetStateAction<boolean>>,
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>,
  sortA: boolean
) => {
  const items = journal.sort((a, b) =>
    sortA === true
      ? new Date(b.onDate.toString().substr(0, 10)).getTime() -
        new Date(a.onDate.toString().substr(0, 10)).getTime()
      : new Date(a.onDate.toString().substr(0, 10)).getTime() -
        new Date(b.onDate.toString().substr(0, 10)).getTime()
  );

  return items.map((item) => {
    return {
      label: item?.onDate.toString().substr(0, 10),
      color: item?.color || "green",
      children: (
        <div
          onClick={() => {
            setEdit(true);
            setEditItem(item);
          }}
          className="w-full"
        >
          <p className="font-semibold">{item?.title}</p>
          <p>{item?.detail}</p>
        </div>
      ),
    };
  });
};

export default function SectionJournalItems({
  group,
  sortA,
}: {
  group: boolean;
  sortA: boolean;
}) {
  const { journal } = useContext(JournalContext);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<JournalItem | null>(null);

  const items = group
    ? renderItems(journal, setEdit, setEditItem, sortA)
    : renderLinear(journal, setEdit, setEditItem, sortA);

  return (
    <>
      <Timeline mode="left" items={items} className="w-fi" />
      {edit && editItem?.id ? (
        <FormJournalEdit journalItem={editItem} edit={edit} setEdit={setEdit} />
      ) : null}
    </>
  );
}
