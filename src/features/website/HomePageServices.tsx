const items = [
  { label: "Work", image: "" },
  { label: "Projects", image: "" },
  { label: "Routines", image: "" },
  { label: "Groceries & Shopping", image: "" },
  { label: "Health & Nutrition", image: "" },
];

export default function HomePageServices() {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center">
      <p className="py-2 px-4 text-sm font-medium text-zinc-900 bg-indigo-200 rounded-full">
        450k People already using Taskit
      </p>
      <div className="text-4xl md:text-5xl lg:text-7xl text-zinc-900 font-light my-6">
        <h2></h2>
        <div className="flex items-center">
          <p className="relative">
            <span className="font-extrabold mr-3">Organize </span>
            <span className="h-6 w-full bg-orange-300 absolute top-12 left-0 -z-10 rounded-3xl"></span>
          </p>
          <span>everything </span>
        </div>
        <p>
          <span>in your </span>
          <span className="text-sky-600">life</span>
        </p>
      </div>
      <div className="flex items-stretch justify-center flex-wrap gap-4 overflow-x-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-3xl bg-zinc-200 h-[150px] w-[300px] md:h-[200px] md:w-[400px] flex flex-col"
          >
            <p className="font-bold text-zinc-900 text-lg">{item.label}</p>
            <div className="flex items-center mt-auto">
              <p className="bg-sky-800 text-white py-2 px-4 rounded-full text-sm">
                Priority
              </p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
      <div>Prioritize, Organize, Achieve</div>
    </section>
  );
}
