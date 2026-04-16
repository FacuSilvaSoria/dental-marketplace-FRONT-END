import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  };

  return (
    <div className="admin-users-page">
      <h2>Gestión de Usuarios</h2>

      <div className="users-table">
        <div className="table-header">
          <span>Nombre</span>
          <span>Email</span>
          <span>Rol</span>
        </div>

        {users.map((user) => (
          <div className="table-row" key={user._id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;