import { ChangeEvent } from "react";

export default function InputField({
  type,
  label,
  name,
  value,
  onChange,
  placeholder = "",
}: {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <label htmlFor={name} className="px-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-zinc-200 py-2 px-4 border-[2px] border-blue-800 rounded-md"
      />
    </div>
  );
}
