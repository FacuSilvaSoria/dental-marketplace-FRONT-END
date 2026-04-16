import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAppointment from "./pages/CreateAppointment";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyAgenda from "./pages/MyAgenda";
import Patients from "./pages/Patients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-appointment" element={<CreateAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-agenda" element={<MyAgenda />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;