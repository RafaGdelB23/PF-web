import React from "react";
import images from "../../../public/img/images";
import { Link } from "react-router-dom";
import "./Main-Destinos-Lugares.css";

const MainDestinosLugares = () => {
  return (
    <div className="MDL-container">
      <h3>Posibles destinos que puedes escoger</h3>
      <div className="imagesLugares">
        <Link to="/Destinos/Volcán">
          <img src={images.Volcanes} alt="Volcanes" />
        </Link>
        <Link to="/Destinos/Parque">
          <img src={images.Parques} alt="Parques" />
        </Link>
        <Link to="/Destinos/SitiosArqueologicos">
          <img src={images.SitiosArqueologicos} alt="Sitios Arqueológicos" />
        </Link>
        <Link to="/Destinos/Playa">
          <img src={images.Playas} alt="Playas" />
        </Link>
        <Link to="/Destinos/CuerpoAguaDulce">
          <img src={images.LagosYlagunas} alt="Lagos y Lagunas" />
        </Link>
      </div>
    </div>
  );
};

export default MainDestinosLugares;
