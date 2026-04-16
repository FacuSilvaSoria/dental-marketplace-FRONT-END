import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Completá email y contraseña.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      if (res.token) {
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));
  navigate("/dashboard");

      } else {
        setErrorMsg(res.message || "No se pudo iniciar sesión.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMsg("Error del servidor o conexión fallida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* lado branding */}
      <div className="login-left">
        <div className="login-brand">
          <img src={logo} alt="Dental Marketplace" className="login-logo" />
          <h1>Dental Marketplace</h1>
          <p>
            Gestioná turnos, pacientes y tu agenda profesional
            en una experiencia moderna y simple.
          </p>
        </div>
      </div>

      {/* lado formulario */}
      <div className="login-right">
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p className="login-subtitle">
            Accedé a tu panel profesional
          </p>

          <input
            type="email"
            placeholder="Ingresá tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {errorMsg && <p className="login-error">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;