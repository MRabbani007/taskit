import React from "react";

export default function InputField({ type, label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="px-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        className="bg-zinc-200 py-2 px-4 border-[2px] border-blue-800 rounded-md"
      />
    </div>
  );
}
