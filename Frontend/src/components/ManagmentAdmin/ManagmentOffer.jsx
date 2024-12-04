import React, { useState, useEffect } from "react";
import "./ManagmentAdmin.css";

const URL = import.meta.env.VITE_BASE_URL;

const ManagmentOffer = () => {
  const [id, setId] = useState("");
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tokenError, setTokenError] = useState(null);

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

  const handleSearch = async () => {
    if (!id) {
      setError("Por favor, ingrese un ID de oferta");
      return;
    }
    setError(null);

    if (!token) {
      setError("No se encuentra token. Necesitas estar autenticado.");
      return;
    }

    setError(null);

    const searchUrl = `${URL}/api/offers/Administrador/${id}`;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setError("Error al buscar la oferta.");
      return;
    }

    const data = await response.json();
    setOffer(data.offer);
  };

  const handleDelete = async () => {
    if (!id) {
      setError("Por favor, ingrese un ID de oferta para eliminar.");
      return;
    }

    if (!token) {
      setError("No se encuentra token. Necesitas estar autenticado.");
      return;
    }

    setError(null);

    const deleteUrl = `${URL}/api/offers/deleteOffer/${id}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setError("Error al eliminar la oferta.");
      return;
    }

    setOffer(null);
    setId("");
    setError(null);
    alert("Oferta eliminada con éxito.");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offer) return;

    const updateUrl = `${URL}/api/offers/editOffer/${id}`;

    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offer),
    });

    if (!response.ok) {
      setError("Hubo un error al actualizar la oferta.");
      return;
    }

    const updatedOffer = await response.json();
    setOffer(updatedOffer);
    setIsEditing(false);
  };

  return (
    <div className="ManagmentOffer-container">
      <h1>Gestión de Ofertas</h1>

      {tokenError && <p className="error">{tokenError}</p>}

      <div className="searchID-container">
        <label htmlFor="searchID">Ingrese el ID de la oferta:</label>
        <input
          id="searchID"
          type="text"
          placeholder="Ingrese el ID aquí"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {offer && !isEditing && (
        <div className="offer-details">
          <h2>Detalles de la Oferta</h2>
          <hr />
          <div className="contentSearch">
            <p>
              <strong>ID de oferta:</strong> {offer._id}
            </p>
            <p>
              <strong>Nombre de oferta:</strong> {offer.name}
            </p>
            <p>
              <strong>Categoria:</strong> {offer.category}
            </p>
            <p>
              <strong>Subcategoria:</strong> {offer.subcategory}
            </p>
            <p>
              <strong>Precio:</strong> {offer.price}
            </p>
            <p>
              <strong>Duración: </strong> {offer.duration}
            </p>
            <p>
              <strong>Ubicación: </strong> {offer.location}
            </p>
            <p>
              <strong>Horarios: </strong> {offer.horario1}, {offer.horario2}, {offer.horario3}
            </p>
          </div>
          <div className="buttonsSearch">
            <button className="editOffer" onClick={handleEdit}>Editar oferta</button>
            <button className="deleteOffer" onClick={handleDelete}>Eliminar oferta</button>
          </div>
        </div>
      )}

      {isEditing && offer && (
        <div className="edit-form-container">
          <h2>Editar Oferta</h2>
          <hr />
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={offer.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Categoria:
              <input
                type="text"
                name="category"
                value={offer.category}
                onChange={handleChange}
              />
            </label>
            <label>
              Subcategoria:
              <input
                type="text"
                name="subcategory"
                value={offer.subcategory}
                onChange={handleChange}
              />
            </label>
            <label>
              Precio:
              <input
                type="text"
                name="price"
                value={offer.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Fecha:
              <input
                type="text"
                name="duration"
                value={offer.duration}
                onChange={handleChange}
              />
            </label>
            <label>
              Ubicación:
              <input
                type="text"
                name="location"
                value={offer.location}
                onChange={handleChange}
              />
            </label>
            <label>
              Horarios:
              <input
                type="text"
                name="horario1"
                value={offer.horario1}
                onChange={handleChange}
              />
              <input
                type="text"
                name="horario2"
                value={offer.horario2}
                onChange={handleChange}
              />
              <input
                type="text"
                name="horario3"
                value={offer.horario3}
                onChange={handleChange}
              />
            </label>
            <div className="buttons">
              <button className="updateOffer" type="submit">Actualizar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagmentOffer;
