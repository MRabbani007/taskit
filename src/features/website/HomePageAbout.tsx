const items = [
  { label: "Simplifying Your Workflow", image: "", bg: "bg-red-200" },
  { label: "Built Around Your Needs", image: "", bg: "bg-sky-200" },
  { label: "Driving Real Results", image: "", bg: "bg-yellow-200" },
];

export default function HomePageAbout() {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center">
      <h2 className="py-2 px-4 text-sm font-medium text-zinc-900 bg-orange-200 rounded-full">
        About Us
      </h2>
      <div className="text-6xl text-zinc-800 font-medium my-6">
        <p>Empowering you</p>
        <p>to Achieve More,</p>
        <p>Every Day</p>
      </div>
      <div className="flex items-stretch gap-6 font-bold text-zinc-900">
        {items.map((item, index) => (
          <div key={index} className={item.bg + " p-4 rounded-xl"}>
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
