import { TaskContext } from "@/context/TaskState";
import { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from "recharts";

// interface TaskDonutChartProps {
//   totalTasks: number;
//   completedTasks: number;
// }

// React.FC<TaskDonutChartProps>
export default function TaskDonutChart() {
  const { tasksSummary } = useContext(TaskContext);
  const totalTasks = tasksSummary?.total ?? 0;
  const overdueTasks = tasksSummary?.overdue ?? 0;
  const completedTasks = tasksSummary?.completed ?? 0;
  const remainingTasks = totalTasks - completedTasks - overdueTasks;

  const completedPercentage = (completedTasks / totalTasks) * 100;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Remaining", value: remainingTasks },
    { name: "Overdue", value: overdueTasks },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#F44336"];

  return (
    <div className="flex flex-col items-center">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          paddingAngle={0}
          dataKey="value"
          animationDuration={500}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          <Text
            x={10}
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold"
          >
            {`${(completedPercentage * 100).toFixed(0)}%`}
          </Text>
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
      {/* <p className="text-lg mt-2">
        Completed: {completedTasks} / {totalTasks} (Overdue: {overdueTasks},
        Remaining: {remainingTasks})
      </p> */}
    </div>
  );
}
