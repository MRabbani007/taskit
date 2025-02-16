export default function RadioGroup({
  title,
  name,
  options,
  value,
  onChange,
}: {
  title?: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <p>{title}</p>
      <div className="flex items-center gap-4 flex-wrap">
        {options.map((option) => (
          <div className="flex items-center gap-1" key={option.value}>
            <input
              type="radio"
              name={name}
              id={name + option.value}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={name + option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
