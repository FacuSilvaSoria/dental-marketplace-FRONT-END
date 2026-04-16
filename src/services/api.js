const API_URL = "http://localhost:5000/api";


// ---------------- LOGIN ----------------
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // manejo de errores correcto
  if (!res.ok) {
    const text = await res.text();
    console.error("Error del backend:", text);
    throw new Error("Error en login");
  }

  return res.json();
};


// ---------------- CREATE APPOINTMENT ----------------
export const createAppointment = async (data, token) => {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error creando turno:", text);
    throw new Error("Error creando turno");
  }

  return res.json();
};


// ---------------- GET DENTISTS ----------------
//  IMPORTANTE: ahora usa /dentists (NO /users/dentists)
export const getDentists = async () => {
  const res = await fetch(`${API_URL}/dentists`);

  if (!res.ok) {
    const text = await res.text();
    console.error("Error cargando dentistas:", text);
    throw new Error("Error cargando dentistas");
  }

  return res.json();
};


// ---------------- GET APPOINTMENTS ----------------
export const getAppointments = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error trayendo turnos:", text);
    throw new Error("Error trayendo turnos");
  }

  return res.json();
};

// ---------------- GET MY PATIENTS ----------------
export const getMyPatients = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/appointments/my-patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error trayendo pacientes:", text);
    throw new Error("Error trayendo pacientes");
  }

  return res.json();
};