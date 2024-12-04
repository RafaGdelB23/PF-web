import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/UseFetch";
import "./ManagmentAdmin.css";

const URL = import.meta.env.VITE_BASE_URL;

const ManagmentUser = () => {
  const [id, setId] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenError, setTokenError] = useState(null);
  const { data } = useFetch(url);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role !== "admin") {
        setTokenError("Acceso restringido: Solo los administradores pueden acceder.");
      }
    } else {
      setTokenError("Por favor, inicia sesión para acceder.");
    }
  }, [token]);

  const handleSearch = () => {
    if (!id) {
      setError("Por favor, ingrese un ID de usuario");
      return;
    }
    setError(null);

    const searchUrl = `${URL}/api/users/Administrador/${id}`;
    setUrl(searchUrl);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    const updateUrl = `${URL}/api/users/editUser/${id}`;

    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      setError("Hubo un error al actualizar el usuario.");
      return;
    }

    const updatedUser = await response.json();
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) {
      setError("Por favor, ingrese un ID de usuario para eliminar.");
      return;
    }

    if (!token) {
      setError("No se encuentra token. Necesitas estar autenticado.");
      return;
    }

    setError(null);

    const deleteUrl = `${URL}/api/users/deleteUser/${id}`;
    
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setError("Hubo un error al eliminar el usuario.");
      return;
    }

    setUser(null);
    setId("");
    setError("Usuario eliminado con éxito.");
  };

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <div className="ManagmentUser-container">
      <h1>Gestión de Usuarios</h1>

      {tokenError && <p className="error">{tokenError}</p>}

      <div className="searchID-container">
        <label htmlFor="searchID">Ingrese el ID del usuario:</label>
        <input
          id="searchID"
          type="text"
          placeholder="Ingrese el ID aquí"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && data.user && !isEditing && (
        <div className="user-details">
          <h2>Detalles del Usuario</h2>
          <hr />
          <div className="contentSearch">
            <p>
              <strong>ID de usuario:</strong> {data.user._id}
            </p>
            <p>
              <strong>Nombre:</strong> {data.user.firstName}
            </p>
            <p>
              <strong>Apellido:</strong> {data.user.lastName}
            </p>
            <p>
              <strong>Teléfono:</strong> {data.user.phone}
            </p>
            <p>
              <strong>Email:</strong> {data.user.email}
            </p>
            <p>
              <strong>Rol:</strong> {data.user.role}
            </p>
          </div>
          <div className="buttonsSearch">
            <button className="editUser" onClick={handleEdit}>Editar usuario</button>
            <button className="deleteUser" onClick={handleDelete}>Eliminar usuario</button>
          </div>
        </div>
      )}

      {isEditing && user && (
        <div className="edit-form-container">
          <h2>Editar Usuario</h2>
          <hr />
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </label>
            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Rol:
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
              />
            </label>
            <button className="submitUpdate" type="submit">Actualizar Usuario</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagmentUser;
