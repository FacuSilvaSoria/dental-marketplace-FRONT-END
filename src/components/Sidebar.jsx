import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Sidebar({ onLogout, onCreateAppointment }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <img src={logo} alt="logo" className="sidebar-logo" />
          <div>
            <h2>Dental Marketplace</h2>
            <span>Smart Care</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {/* Dashboard */}
          <button
            className="nav-btn active"
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>

          {/* Mi perfil */}
          <button
            className="nav-btn"
            onClick={() => navigate("/profile")}
          >
            👤 Mi Perfil
          </button>

          {/* paciente */}
          {user?.role === "patient" && (
            <button
              className="nav-btn"
              onClick={onCreateAppointment}
            >
              📅 Crear turno
            </button>
          )}

          {/* dentista */}
{user?.role === "dentist" && (
  <>
    <button
      className="nav-btn"
      onClick={() => navigate("/my-agenda")}
    >
      📅 Mi agenda
    </button>

    <button
      className="nav-btn"
      onClick={() => navigate("/patients")}
    >
      👥 Pacientes
    </button>
  </>
)}

          {/* admin */}
          {user?.role === "admin" && (
            <>
              <button className="nav-btn">
                📅 Todos los turnos
              </button>

              <button className="nav-btn">
                👥 Usuarios
              </button>

              <button className="nav-btn">
                📊 Reportes
              </button>
            </>
          )}
        </nav>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;