import { ReactNode } from "react";
import PageLinks from "../navigation/PageLinks";

export default function PageHeader({
  children,
  secondChildren,
  className,
}: {
  children?: ReactNode;
  secondChildren?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "p-4 flex flex-col items-start gap-4 rounded-xl bg-gradient-to-r shadow-md shadow-zinc-500 " +
        className
      }
    >
      <header className="text-white gap-4 self-stretch flex items-center flex-wrap group">
        {children}
      </header>
      <div className="flex items-center justify-between self-stretch">
        {secondChildren}
        <PageLinks />
      </div>
    </div>
  );
}
