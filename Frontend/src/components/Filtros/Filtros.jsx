import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getToken } from "../../utils/Utils";
import Slider from "../Slider/Slider.jsx";
import "./Filtros.css";

const URL = import.meta.env.VITE_BASE_URL;


const normalizeString = (str) => {
  return str
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .replace(/ /g, "+") 
    .replace(/-/g, "+"); 
};

const Filtros = () => {
  const { user } = useContext(AuthContext);
  const [presupuesto, setPresupuesto] = useState(0);
  const [dias, setDias] = useState(0);
  const [comida, setComida] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [intereses, setIntereses] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [apiError, setApiError] = useState("");

  const limpiarFiltros = () => {
    setPresupuesto(0);
    setDias(0);
    setComida([]);
    setActividades([]);
    setIntereses([]);
    setFilteredOffers([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  };

  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;

    if (type === "comida") {
      setComida((prevComida) => {
        if (checked) {
          return [...prevComida, normalizeString(value)];
        } else {
          return prevComida.filter((item) => item !== normalizeString(value));
        }
      });
    }

    if (type === "actividades") {
      setActividades((prevActividades) => {
        if (checked) {
          return [...prevActividades, normalizeString(value)];
        } else {
          return prevActividades.filter((item) => item !== normalizeString(value));
        }
      });
    }

    if (type === "intereses") {
      setIntereses((prevIntereses) => {
        if (checked) {
          return [...prevIntereses, normalizeString(value)];
        } else {
          return prevIntereses.filter((item) => item !== normalizeString(value));
        }
      });
    }
  };

  const buscarFiltros = async () => {
    if (
      presupuesto === 0 &&
      dias === 0 &&
      comida.length === 0 &&
      actividades.length === 0 &&
      intereses.length === 0
    ) {
      return;
    }

    
    const filtros = new URLSearchParams({
      presupuesto,
      dias,
      comida: comida.length > 0 ? comida.join(",") : "", 
      actividades: actividades.length > 0 ? actividades.join(",") : "", 
      intereses: intereses.length > 0 ? intereses.join(",") : "", 
    });

    const token = getToken();
    if (!token) {
      setApiError("Por favor, inicia sesión para continuar.");
      return;
    }

    try {
      const response = await fetch(
        `${URL}/api/filtro/searchFilters?${filtros.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        
        const filtered = data.filter((offer) => {
          const matchesComida = comida.length
            ? comida.every((item) => offer.food && offer.food.some(food => normalizeString(food) === item)) 
            : true;
          const matchesActividades = actividades.length
            ? actividades.every((item) => offer.activities && offer.activities.some(activity => normalizeString(activity) === item))
            : true;
          const matchesIntereses = intereses.length
            ? intereses.every((item) => offer.interests && offer.interests.some(interest => normalizeString(interest) === item))
            : true;

          return (
            matchesComida &&
            matchesActividades &&
            matchesIntereses &&
            (presupuesto ? offer.budget <= presupuesto : true) &&
            (dias ? offer.days <= dias : true)
          );
        });

        setFilteredOffers(filtered);
      } else {
        setApiError(data.message || "Hubo un problema al aplicar los filtros.");
      }
    } catch (error) {
      console.error("Error al aplicar los filtros:", error);
      setApiError("Hubo un problema al conectarse con el servidor.");
    }
  };

  return (
    <div className="filtros-container">
      <div className="text-container">
        <h3>¡Te ayudamos a planificar tu viaje!</h3>
        <h4>
          Encuentra el viaje perfecto para ti: <br />
          selecciona tus intereses y descubre actividades únicas.
        </h4>
      </div>

      <div className="sliders-container">
        <Slider
          label="¿Cuál es tu presupuesto para el viaje?"
          min={0}
          max={2000}
          step={25}
          unit="$"
          value={presupuesto}
          onChange={setPresupuesto}
        />
        <Slider
          label="¿Cuántos días tienes pensado viajar?"
          min={0}
          max={30}
          step={1}
          value={dias}
          onChange={setDias}
        />
      </div>

      <div className="preferences-form">
        <h2>Cuéntanos sobre tus gustos y preferencias...</h2>
        <form>
          <div className="section1">
            <h3>Comida:</h3>
            {[
              "mariscos",
              "comida-rápida",
              "gastronomía-local",
              "steakhouse",
              "comida internacional",
            ].map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="comida"
                  value={value}
                  checked={comida.includes(normalizeString(value))}
                  onChange={(e) => handleCheckboxChange(e, "comida")}
                />
                {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
              </label>
            ))}
          </div>

          <div className="section2">
            <h3>Actividades:</h3>
            {[
              "actividades-acuáticas",
              "senderismo",
              "ciclismo",
              "camping",
              "visitar pueblos",
            ].map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="actividades"
                  value={value}
                  checked={actividades.includes(normalizeString(value))}
                  onChange={(e) => handleCheckboxChange(e, "actividades")}
                />
                {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
              </label>
            ))}
          </div>

          <div className="section3">
            <h3>Intereses:</h3>
            {[
              "museos",
              "sitios-arqueológicos",
              "montaña",
              "naturaleza",
              "volcanes",
            ].map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="intereses"
                  value={value}
                  checked={intereses.includes(normalizeString(value))}
                  onChange={(e) => handleCheckboxChange(e, "intereses")}
                />
                {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
              </label>
            ))}
          </div>
        </form>
      </div>

      <div className="filterButtons">
        <div className="buttonClear">
          <button onClick={limpiarFiltros}>Limpiar Filtros</button>
        </div>
        <div className="searchFilters">
          <button className="searchFilter" onClick={buscarFiltros}>
            Buscar
          </button>
        </div>
      </div>

      {apiError && <p className="error-message">{apiError}</p>}

      <hr />
      <h4 className="TextFinal">Explora tus opciones...</h4>
      <div className="card-container">
        {filteredOffers && filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer._id} className="card">
              <img src={offer.img} alt={offer.name} />
              <div className="offerInfo">
                <h5>{offer.name}</h5>
                <a href={offer.masInfo} target="_blank" >
                  Más Información
                </a>
                <p> <strong>Presupuesto:</strong> ${offer.budget} </p>
                <p> <strong>Días:</strong> {offer.days} días </p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron ofertas.</p>
        )}
      </div>
    </div>
  );
};

export default Filtros;
