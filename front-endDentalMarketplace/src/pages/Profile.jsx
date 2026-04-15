import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getAppointments } from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);
    setName(storedUser.name);
  }, [navigate]);

  const fetchAppointments = async () => {
  try {
    setLoadingAppointments(true);
    const data = await getAppointments();
    setAppointments(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error trayendo turnos:", error);
    setAppointments([]);
  } finally {
    setLoadingAppointments(false);
  }
};

const sortedAppointments = [...appointments].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

const upcomingAppointments = sortedAppointments.filter(
  (a) => new Date(a.date) >= new Date()
);

const pastAppointments = sortedAppointments.filter(
  (a) => new Date(a.date) < new Date()
);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      <Sidebar
        onLogout={logout}
        onCreateAppointment={() => navigate("/create-appointment")}
      />

      <main className="dashboard-content">
        <Header />

        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">
              <h2>Mi Perfil</h2>

              <div className="profile-field">
                <label>Nombre</label>

                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>

              <div className="profile-field">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="profile-field">
                <label>Rol</label>
                <p>{user.role}</p>
              </div>

              <section className="history-section">
  <div className="history-card">
    <h2>📅 Historial de Turnos</h2>

    {loadingAppointments ? (
      <p>Cargando turnos...</p>
    ) : (
      <>
        <div className="history-block">
          <h3>Próximos turnos</h3>

          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((a) => (
              <div key={a._id} className="history-item">
                <div>
                  <strong>
                    {a.dentist?.name || "Dentista"}
                  </strong>
                  <p>
                    {new Date(a.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No tenés próximos turnos</p>
          )}
        </div>

        <div className="history-block">
          <h3>Turnos anteriores</h3>

          {pastAppointments.length > 0 ? (
            pastAppointments.map((a) => (
              <div key={a._id} className="history-item">
                <div>
                  <strong>
                    {a.dentist?.name || "Dentista"}
                  </strong>
                  <p>
                    {new Date(a.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay turnos anteriores</p>
          )}
        </div>
      </>
    )}
  </div>
</section>

              <div className="profile-actions">
                {editing ? (
                  <button className="save-btn" onClick={handleSave}>
                    Guardar cambios
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => setEditing(true)}
                  >
                    Editar perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;