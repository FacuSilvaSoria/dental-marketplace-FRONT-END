function StatsCard({ title, value, color }) {
  return (
    <div className="stats-card">
      <p className="stats-title">{title}</p>
      <h3 className="stats-value" style={{ color }}>
        {value}
      </h3>
    </div>
  );
}

export default StatsCard;