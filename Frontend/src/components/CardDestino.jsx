import React from "react";
import { Link } from "react-router-dom";

const CardDestino = ({ img, place, location, id }) => {
  return (
    <div className="cardDestino-container">
      <div className="imgCard">
        <img src={img} alt={place} className="card-img" />
      </div>
      <div className="contentCardDestino">
        <div className="informationText">
          <h3>{place}</h3>
          <p>{location}</p>
        </div>
        <Link to={`/Destino/${id}`} className="card-button">Conoce más</Link>
      </div>
    </div>
  );
};

export default CardDestino;
