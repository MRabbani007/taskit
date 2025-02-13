export default function ToggleSwitch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex justify-start items-center gap-4 text-gray-400">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`${
          value ? "bg-blue-600" : "bg-gray-400"
        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform bg-white rounded-full transition`}
        />
      </button>
    </div>
  );
}
