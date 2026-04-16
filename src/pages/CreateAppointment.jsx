import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../services/api";

function CreateAppointment() {
  const [date, setDate] = useState("");
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ---------------- LOAD DENTISTS ----------------
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dentists");
        const data = await res.json();

        console.log("DENTISTS:", data); // 👈 CLAVE

        setDentists(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching dentists:", err);
        setDentists([]);
      }
    };

    fetchDentists();
  }, []);

  // ---------------- CREATE APPOINTMENT ----------------
  const handleCreate = async () => {
    if (!selectedDentist || !date) {
      setMessage("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      await createAppointment(
        {
          dentistId: selectedDentist,
          date,
        },
        token
      );

      setMessage("Turno creado correctamente");

      setSelectedDentist("");
      setDate("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error al crear turno:", error);
      setMessage("Error al crear turno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear nuevo turno</h2>

        <select
          style={styles.input}
          value={selectedDentist}
          onChange={(e) => setSelectedDentist(e.target.value)}
        >
          <option value="">Seleccionar dentista</option>

          {dentists.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear turno"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f8fbff, #eef5ff)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#0f172a",
  },
  input: {
  width: "100%",
  padding: "0 16px",
  marginBottom: "20px",
  borderRadius: "14px",
  border: "1px solid #dbeafe",
  fontSize: "16px",
  outline: "none",
  height: "56px",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
},
  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "600",
  },
};

export default CreateAppointment;