import { MdOutlineNextPlan } from "react-icons/md";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";

export default function PlannerSummaryCard() {
  const items = [
    {
      title: "Upcoming",
      bg: "bg-yellow-400",
      count: 2,
      icon: <MdOutlineNextPlan size={30} />,
    },
    {
      title: "In Progress",
      bg: "bg-blue-600",
      count: 4,
      icon: <TbProgressHelp size={30} />,
    },
    {
      title: "Completed",
      bg: "bg-green-600",
      count: 10,
      icon: <TbProgressCheck size={30} />,
    },
    {
      title: "Canceled",
      bg: "bg-red-600",
      count: 1,
      icon: <TbProgressX size={30} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch flex-wrap flex-1 gap-2 text-white">
      {items.map((item, idx) => (
        <PlannerItem item={item} key={idx} />
      ))}
    </div>
  );
}

function PlannerItem({
  item,
}: {
  item: { title: string; bg: string; count: number; icon: any };
}) {
  return (
    <div
      title={item.title}
      className={item.bg + " p-2 flex-1 flex items-center gap-4 rounded-lg"}
    >
      {item.icon}
      <span className="whitespace-nowrap">{item.count} Tasks</span>
    </div>
  );
}
