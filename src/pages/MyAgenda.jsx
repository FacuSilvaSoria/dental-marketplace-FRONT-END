import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AppointmentCards from "../components/AppointmentCards";
import { getAppointments } from "../services/api";

function MyAgenda() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      const dentistAppointments = data.filter(
        (a) => a.dentist?._id === user?._id
      );

      setAppointments(dentistAppointments);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={logout} />

      <main className="dashboard-content">
        <Header />

        <section className="appointments-section">
          <h2 className="section-title">Mi Agenda</h2>

          {appointments.length === 0 ? (
            <p className="no-data">No tenés turnos asignados.</p>
          ) : (
            <div className="appointments-grid">
              {appointments.map((a) => (
                <AppointmentCards key={a._id} appointment={a} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MyAgenda;