const AppointmentCards = ({ appointment }) => {
  const { dentist, patient, date, status } = appointment || {};

  const statusColors = {
    pending: "#f59e0b",
    confirmed: "#10b981",
    cancelled: "#ef4444",
  };

  const formatDate = (d) => {
    const dateObj = new Date(d);
    if (isNaN(dateObj)) return "Fecha inválida";

    return dateObj.toLocaleString("es-AR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="appointment-card">
      {/* HEADER */}
      <div className="card-header">
        <div className="dentist-name">
          👨‍⚕️ {dentist?.name || "Dentista: Dr. Silva Soria"}
        </div>

        <span
          className="status-badge"
          style={{
            backgroundColor: statusColors[status] || "#999",
          }}
        >
          {status || "unknown"}
        </span>
      </div>

      {/* BODY */}
      <div className="card-body">
        <div className="info-row">
          <span className="label">Paciente:</span>
          <span className="value">
            {patient?.name || "Sin paciente"}
          </span>
        </div>

        <div className="info-row">
          <span className="label">Fecha:</span>
          <span className="value">
            {formatDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCards;