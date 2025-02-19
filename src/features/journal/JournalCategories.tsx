import { JournalContext } from "@/context/JournalState";
import { useContext } from "react";
import { BiX } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

export default function JournalCategories() {
  const { categories } = useContext(JournalContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (item: JournalCategory) => {
    searchParams.set("cat", item._id);
    setSearchParams(searchParams);
  };

  const handleClear = () => {
    searchParams.delete("cat");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <p className="font-bold bg-amber-950/80 rounded-xl py-2 px-4 text-white w-fit">
        Categories
      </p>
      <div className="hidden md:flex flex-col gap-1 py-2">
        {categories.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(item)}
            className="btn bg-zinc-100 hover:bg-white space-x-2"
          >
            <span>{item._id}</span>
            <span>{item.count}</span>
          </button>
        ))}
        <button
          onClick={handleClear}
          className="btn bg-zinc-100 hover:bg-white"
        >
          <BiX size={25} />
        </button>
      </div>
    </div>
  );
}
