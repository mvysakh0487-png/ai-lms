export default function PerformanceOverview({ risk }) {
  return (
    <div className="card">
      <h3>Performance Overview</h3>
      <p>Risk Level: <strong>{risk}</strong></p>
    </div>
  );
}
