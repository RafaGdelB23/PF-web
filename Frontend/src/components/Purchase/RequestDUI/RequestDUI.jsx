import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getToken } from "../../../utils/Utils"; 
import "../Purchase.css";

const RequestDUI = ({ dui, setDui, onNext, purchaseId }) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(""); 
  const URL = import.meta.env.VITE_BASE_URL;

  const handleNext = async () => {
    const duiRegex = /^\d{8}-\d{1}$/;

    if (!dui) {
      setError("Por favor, ingresa tu DUI para continuar.");
      return;
    }
    if (!duiRegex.test(dui)) {
      setError("Por favor, ingresa un DUI válido en el formato XXXXXXXX-X.");
      return;
    }

    setError("");
    setApiError(""); 

    const token = getToken();
    if (!token) {
      alert("Por favor, inicia sesión para continuar.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/purchases/${purchaseId}/add-dui`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ dui }),
      });

      const result = await response.json();

      if (response.ok) {
        onNext();
      } else {
        setApiError(result.message || "Hubo un problema al agregar el DUI.");
      }
    } catch (error) {
      console.error("Error al enviar DUI:", error);
      setApiError("Hubo un problema al conectarse con el servidor.");
    }
  };

  const formatDui = (value) => {
    return value
      .replace(/\D/g, "") 
      .replace(/^(\d{8})(\d)/, "$1-$2")
      .substring(0, 10); 
  };

  return (
    <div className="form-step active">
      <div className="bg-info2">
        <ul>
          <li>
            <strong>Nombre:</strong> {user?.firstName || "Nombre"} {user?.lastName || "Apellido"}
          </li>
          <li>
            <strong>Correo:</strong> {user?.email || "Correo no disponible"}
          </li>
          <li>
            <strong>Teléfono:</strong> {user?.phone || "Teléfono no disponible"}
          </li>
        </ul>
      </div>

      <div className="input-group">
        <label htmlFor="dui">DUI:</label>
        <input
          id="dui"
          type="text"
          placeholder="XXXXXXXX-X"
          value={dui}
          onChange={(e) => setDui(formatDui(e.target.value))}
        />
        {error && <p className="error-message">{error}</p>}
        {apiError && <p className="error-message">{apiError}</p>} 
      </div>

      <div className="button-container">
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default RequestDUI;
