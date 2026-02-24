import "./StatCard.css";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && <span className="stat-card-icon">{icon}</span>}
      </div>

      <div className="stat-card-value">
        {value}
      </div>
    </div>
  );
}
