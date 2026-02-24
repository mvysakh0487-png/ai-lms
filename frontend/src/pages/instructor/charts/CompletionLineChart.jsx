import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "W1", score: 72 },
  { week: "W2", score: 78 },
  { week: "W3", score: 74 },
  { week: "W4", score: 82 },
];

export default function CompletionLineChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="week" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
