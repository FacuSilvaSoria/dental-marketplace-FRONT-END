import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AppointmentCalendar({ appointments }) {
  const appointmentDates = appointments.map(
    (a) => new Date(a.date).toDateString()
  );

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <h2>Calendario de Turnos</h2>
        <p>Visualizá tus próximas citas de forma clara.</p>
      </div>

      <Calendar
        tileClassName={({ date }) =>
          appointmentDates.includes(date.toDateString())
            ? "highlight-date"
            : null
        }
      />
    </div>
  );
}

export default AppointmentCalendar;