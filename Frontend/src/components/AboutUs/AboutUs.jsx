import React from "react";
import images from "../../public/img/images.js";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <div className="introduccion">
        <p>
          Este proyecto consiste en una página web enfocada en un sitio sobre
          turismo salvadoreño, lo que buscamos en una página web innovadora, con
          un diseño moderno y que permita a los usuarios una navegación sencilla
          pero eficaz, añadiendo secciones poder personalizar tu propio viaje.
          Además, incluimos secciones interactivas para que cada visitante pueda
          personalizar su propio viaje, adaptando las opciones a sus intereses y
          preferencias. Con esto, buscamos acercar la riqueza cultural y natural
          de El Salvador a todos, creando una herramienta útil para planificar
          una visita memorable.
        </p>
      </div>
      <h1>Sobre nosotros</h1>
      <div className="students">
        <div className="img1">
          <h3>Luis Antonio Merino Beltrán</h3>
          <img src={images.LuijImg} alt="Luis Antonio Merino Beltrán" />
          <h4>Estudiante Ing. Informática</h4>
          <a href="#">https://github.com/Luismerino123</a>
        </div>
        <div className="img2">
          <h3>Rafael Gutiérrez del Barrio</h3>
          <img src={images.RafaImg} alt="Rafael Gutiérrez del Barrio" />
          <h4>Estudiante Ing. Informática</h4>
          <a href="https://github.com/RafaGdelB23" target="blank">Perfil de Github</a>
        </div>
        <div className="img3">
          <h3>Javier Alejandro Cáceres Campos</h3>
          <img src={images.JaviImg} alt="Javier Alejandro Cáceres Campos" />
          <h4>Estudiante Ing. Informática</h4>
          <a href="#">https://github.com/JavierCaceres5</a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
