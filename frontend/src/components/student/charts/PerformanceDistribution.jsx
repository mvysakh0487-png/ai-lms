import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

export default function PerformanceDistribution({ distribution = {} }) {
  const data = [
    { name: "Excellent", value: distribution.excellent || 0 },
    { name: "Good", value: distribution.good || 0 },
    { name: "Average", value: distribution.average || 0 },
    { name: "Below Average", value: distribution.below || 0 }
  ];

  return (
    <div className="card">
      <h3>Performance Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
