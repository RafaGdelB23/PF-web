import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import images from "../../public/img/images";
import "./ProfileUser.css";

const ProfileUser = () => {
  const { user, updateUser, removeToken } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const navigate = useNavigate();

  const toggleDataMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/Login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const renderAdminSections = () => (
    <div className="admin-sections">
      <button onClick={() => navigate("/UserManagement")}>
        Gestión de Usuarios
      </button>
      <button onClick={() => navigate("/OfferManagement")}>
        Gestión de Ofertas
      </button>
    </div>
  );

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="dataProfile-container">
      <h1>Mi Cuenta</h1>
      <div className="userData-container">
        <div className="userData-header">
          <img src={images.PerfilLogo} alt="Perfil" />
          <div className="userData-text">
            <h3>
              {user?.firstName || "Nombre"} {user?.lastName || "Apellido"}
            </h3>
            <p>{user?.email || "Correo no disponible"}</p>
          </div>
        </div>
        <div className="userData-information">
          <h3>Datos personales</h3>
          <div className="cross-menu" onClick={toggleDataMenu}>
            <div className="horizontalBar"></div>
            <div className="verticalBar"></div>
          </div>
        </div>
        <div className={`userData-datos ${menuOpen ? "open" : ""}`}>
          <label id="name">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={editedUser.firstName}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Primer nombre Segundo nombre"
          />
          <label id="surname">Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={editedUser.lastName}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Primer apellido Segundo apellido"
          />
          <label id="phone">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="XXXX - XXXX"
          />
          <label id="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Correo electrónico"
          />
          <div className="userData-buttons">
            <button
              className="ChangePassButton"
              onClick={() => navigate("/CodeConfirm")}
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
      <button className="buttonLogOut" onClick={handleLogout}>
        Cerrar sesión
      </button>
      {user?.role === "admin" && renderAdminSections()}
    </div>
  );
};

export default ProfileUser;
