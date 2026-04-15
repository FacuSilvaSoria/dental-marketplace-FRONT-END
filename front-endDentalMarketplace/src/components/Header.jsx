import logo from "../assets/logo.png";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="dashboard-header">
      <div>
        <h1>Bienvenido 👋</h1>
        <p>Gestioná tu agenda dental de forma inteligente.</p>
      </div>

      <div className="user-box">
        👤 {user?.name || "Usuario"}
      </div>
    </header>
  );
}

export default Header;