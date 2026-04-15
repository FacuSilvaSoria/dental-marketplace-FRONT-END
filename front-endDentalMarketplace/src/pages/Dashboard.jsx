import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import AppointmentCards from "../components/AppointmentCards";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import AppointmentCalendar from "../components/AppointmentCalendar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchAppointments();
    }
  }, []);

  // ---------------- FETCH ----------------
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error al traer appointments:", err);
      setAppointments([]);
      setError("No se pudieron cargar los turnos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ---------------- SAFE DATA ----------------
  const safeAppointments = (appointments || []).filter(
    (a) => a && a.date
  );

  const getValidDate = (date) => {
    const d = new Date(date);
    return isNaN(d) ? null : d;
  };

  // ---------------- TODAY ----------------
  const today = new Date().toDateString();

  const todayAppointments = safeAppointments.filter((a) => {
    const date = getValidDate(a.date);
    return date && date.toDateString() === today;
  });

  // ---------------- NEXT APPOINTMENT ----------------
  const nextAppointment = safeAppointments
    .filter((a) => getValidDate(a.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // ---------------- UPCOMING 24H ----------------
  const now = new Date();

  const upcomingSoonAppointments = safeAppointments.filter((a) => {
    const date = getValidDate(a.date);
    if (!date) return false;

    const diffHours = (date - now) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar
        onLogout={logout}
        onCreateAppointment={() => navigate("/create-appointment")}
      />

      <main className="dashboard-content">
        {/* HEADER */}
        <Header />

        {/* ALERT */}
        {upcomingSoonAppointments.length > 0 && (
          <div className="appointment-alert">
            🔔 Tenés {upcomingSoonAppointments.length} turno(s) en las próximas 24 horas
          </div>
        )}

        {/* KPI */}
        <section className="stats-grid">
          <StatsCard
            title="Turnos Totales"
            value={safeAppointments.length}
            color="#0ea5e9"
          />

          <StatsCard
            title="Turnos Hoy"
            value={todayAppointments.length}
            color="#10b981"
          />

          <StatsCard
            title="Próximo Turno"
            value={
              nextAppointment
                ? new Date(nextAppointment.date).toLocaleDateString()
                : "Sin turnos"
            }
            color="#6366f1"
          />
        </section>

        {/* CALENDAR */}
        <section className="calendar-section">
          <AppointmentCalendar appointments={safeAppointments} />
        </section>

        {/* APPOINTMENTS */}
        <section className="appointments-section">
          <h2 className="section-title">Agenda de Turnos</h2>

          {loading && <p className="no-data">Cargando turnos...</p>}

          {!loading && error && <p className="no-data">{error}</p>}

          {!loading && !error && safeAppointments.length === 0 && (
            <p className="no-data">No hay turnos aún.</p>
          )}

          {!loading && !error && safeAppointments.length > 0 && (
            <div className="appointments-grid">
              {safeAppointments.map((a) => (
                <AppointmentCards key={a._id} appointment={a} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;