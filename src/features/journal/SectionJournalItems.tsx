import { Dispatch, SetStateAction, useContext, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import FormJournalEdit from "./FormJournalEdit";

type DayItems = {
  label: string;
  color: string;
  children: {
    group: string;
    activities: JournalItem[];
  }[];
};

const groupItems = (
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

  const items: DayItems[] = groups.map((day) => ({
    label: day.onDate.toString().substr(0, 10),
    color: "green",
    children: day.groups.map((group) => ({
      group,
      activities: journal.filter(
        (item) => item.onDate === day.onDate && item.title === group
      ),
    })),
  }));

  return items;
};

const renderLinear = (
  journal: JournalItem[],
  setEdit: Dispatch<SetStateAction<boolean>>,
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>,
  sortA: boolean
) => {
  // const items = journal.sort((a, b) =>
  //   sortA === true
  //     ? new Date(b.onDate.toString().substr(0, 10)).getTime() -
  //       new Date(a.onDate.toString().substr(0, 10)).getTime()
  //     : new Date(a.onDate.toString().substr(0, 10)).getTime() -
  //       new Date(b.onDate.toString().substr(0, 10)).getTime()
  // );

  return journal.map((item) => {
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
    ? groupItems(journal, setEdit, setEditItem, sortA).map((group) => (
        <RenderGroup
          dayItems={group}
          key={group.label}
          setEdit={setEdit}
          setEditItem={setEditItem}
        />
      ))
    : journal.map((item) => (
        <CardJournalItemExpanded
          item={item}
          key={item.id}
          setEdit={setEdit}
          setEditItem={setEditItem}
        />
      ));

  return (
    <>
      {/* <Timeline mode="left" items={items} className="w-fi" /> */}
      <div className="flex-1 flex flex-col gap-4">{items}</div>
      {edit && editItem?.id ? (
        <FormJournalEdit journalItem={editItem} edit={edit} setEdit={setEdit} />
      ) : null}
    </>
  );
}

function CardJournalItem({
  item,
  setEdit,
  setEditItem,
}: {
  item: JournalItem;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>;
}) {
  return (
    <div
      onClick={() => {
        setEdit(true);
        setEditItem(item);
      }}
      className="hover:bg-zinc-200 duration-200 py-2 px-4 cursor-pointer"
    >
      <p className="font-bold">{item.task}</p>
      <p>{item.detail}</p>
    </div>
  );
}

function CardJournalItemExpanded({
  item,
  setEdit,
  setEditItem,
}: {
  item: JournalItem;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>;
}) {
  return (
    <div
      className="flex items-stretch gap-0 border-[0px] border-blue-500 rounded-xl overflow-clip"
      onClick={() => {
        setEdit(true);
        setEditItem(item);
      }}
    >
      <div className="bg-amber-950/80 text-white p-4 min-w-[200px]">
        <p className="font-bold  text-lg">{item.title}</p>
        <p className="text-xs text-zinc-300">
          {item.onDate.toString().substr(0, 10)}
        </p>
      </div>
      <div className="border-[1px] border-orange-800 text-zinc-800 rounded-r-xl flex-1 p-4">
        <p>{item?.task}</p>
        <p>{item?.detail}</p>
        <p>{item?.notes}</p>
      </div>
    </div>
  );
}

function RenderGroup({
  dayItems,
  setEdit,
  setEditItem,
}: {
  dayItems: DayItems;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<JournalItem | null>>;
}) {
  return (
    <>
      <div className="bg-amber-950/80 rounded-xl py-2 px-4 text-white w-fit">
        {dayItems.label}
      </div>
      {dayItems.children.map((activitiesGroup, index) => {
        return (
          <div key={index}>
            <p className="font-semibold bg-orange-900/70 text-white rounded-t-xl py-2 px-4">
              {activitiesGroup.group}
            </p>
            <div className="border-2 border-orange-800/70 rounded-b-xl flex flex-col gap-0 overflow-clip">
              {activitiesGroup.activities.map((activity) => {
                return (
                  <CardJournalItem
                    item={activity}
                    key={activity.id}
                    setEdit={setEdit}
                    setEditItem={setEditItem}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
