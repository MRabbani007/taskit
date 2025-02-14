import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  value: string | number;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  lang?: "English" | "Russian";
};

export default function TextAreaField({
  label,
  name,
  value = "",
  handleChange,
  autoFocus = false,
  lang,
}: Props) {
  return (
    <div className="grid grid-cols-1 items-center gap-0">
      <label htmlFor={name} className="text-sm font-medium px-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        autoFocus={autoFocus}
        placeholder={label}
        lang={lang}
        className="bg-transparent border-[1px] border-zinc-300 rounded-md line-clamp-2 min-h-20 p-2"
        value={value ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
