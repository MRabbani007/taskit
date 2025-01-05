import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

export default function Pagination({
  page,
  count,
  className,
}: {
  page: number;
  count: number;
  className?: string;
}) {
  const [_, setSearchParams] = useSearchParams();

  const isFirst = page === 1;
  const isLast = page === Math.ceil(count / 15);

  const handleClick = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(count / 15)) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  return (
    <div className={"flex items-center gap-2 " + className}>
      <button
        disabled={isFirst}
        onClick={() => handleClick(page - 1)}
        className="hover:bg-zinc-100 rounded-md"
      >
        <BiChevronLeft size={25} />
      </button>
      {Array.from({ length: Math.ceil(count / 15) }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={
            (page === index + 1
              ? "border-[1px] border-blue-600 text-blue-600"
              : "") + " py-1 px-2 rounded-md hover:bg-zinc-100"
          }
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={isLast}
        onClick={() => handleClick(page + 1)}
        className="hover:bg-zinc-100 rounded-md"
      >
        <BiChevronRight size={25} />
      </button>
    </div>
  );
}
