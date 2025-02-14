import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function Button({
  props,
  children,
  onClick,
}: {
  props?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      {...props}
      onClick={onClick}
      className="py-2 px-2 flex items-center gap-2 rounded-md bg-gray-300 hover:bg-gray-200 duration-200"
    >
      {children}
    </button>
  );
}
