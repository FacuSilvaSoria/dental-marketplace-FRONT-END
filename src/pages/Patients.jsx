import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getMyPatients } from "../services/api";

function Patients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const data = await getMyPatients();

      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={logout} />

      <main className="dashboard-content">
        <Header />

        <section className="appointments-section">
          <h2 className="section-title">Mis Pacientes</h2>

          {loading && (
            <p className="no-data">Cargando pacientes...</p>
          )}

          {!loading && patients.length === 0 && (
            <p className="no-data">Todavía no tenés pacientes.</p>
          )}

          {!loading && patients.length > 0 && (
            <div className="appointments-grid">
              {patients.map((patient) => (
                <div key={patient._id} className="appointment-card">
                  <h3>{patient.name}</h3>
                  <p>{patient.email}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Patients;