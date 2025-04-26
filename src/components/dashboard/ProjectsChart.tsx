import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ProjectsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-[400px]">
      <h2 className="text-lg font-medium mb-4">Projects by Status</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill={COLORS[COLORS.length]} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
