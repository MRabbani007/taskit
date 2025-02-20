import { ReactNode, useState } from "react";

export default function Tooltip({
  direction = "top",
  children,
  title,
}: {
  direction: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  title: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={`absolute ${getTooltipPosition(
          direction
        )} bg-amber-900 text-white p-2 rounded-md text-sm z-[100] opacity-0 invisible group-hover:visible transition-opacity duration-300 group-hover:opacity-100`}
      >
        <div className="whitespace-nowrap">{title}</div>
      </div>
    </div>
  );
}

const getTooltipPosition = (direction: string) => {
  switch (direction) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "top-1/2 right-full transform -translate-y-1/2 mr-2";
    case "right":
      return "top-1/2 left-full  -translate-y-1/2 ml-3";
    default:
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }
};
