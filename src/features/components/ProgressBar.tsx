import { useEffect, useState } from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress((completed / total) * 100);
    }, 300);

    return () => clearTimeout(timeout);
  }, [completed, total]);

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-200 rounded h-4 overflow-hidden flex-1 border-[1px] border-zinc-900/10">
        <div
          className="bg-blue-500 h-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{`${completed} / ${total}`}</p>
    </div>
  );
}
