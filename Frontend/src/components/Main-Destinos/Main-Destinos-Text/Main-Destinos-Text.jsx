import React from "react";
import images from "../../../public/img/images";
import "./Main-Destinos-Text.css";

const MainDestinosText = () => {
  return (
    <div className="MDT-container">
      <h2 className="IntroMTD">¡Descubre la magia de El Salvador!</h2>

      <div className="p1">
        Explora todos los destinos que El Salvador tiene para ofrecer: desde
        impresionantes paisajes naturales y playas paradisíacas, hasta rutas
        culturales y sitios arqueológicos llenos de historia. Descubre cada
        rincón de este país y encuentra el lugar perfecto para tu próxima
        aventura o momento de relajación.
      </div>

      <div className="map-container">
        <div className="overlay-container">
          <img src={images.MapSal} alt="Mapa de El Salvador" />
          <div className="overlayMapa">MAPA DE EL SALVADOR</div>
        </div>
      </div>
      <div className="imgText">
        Explora los Rincones de El Salvador con Nuestro Mapa de Destinos
      </div>
      <div className="textHistoria">
        El Salvador es un país con profundas raíces indígenas, donde culturas
        antiguas como los pipiles han dejado su huella en tradiciones y
        costumbres. Esta herencia se refleja en la gastronomía y el arte,
        especialmente en zonas como Sonsonate y Ahuachapán, que conservan
        elementos de la cultura ancestral.
        <br />
        <br />
        Con su variada geografía de volcanes, lagos y playas, y un folclore
        vibrante en celebraciones y fiestas patronales, El Salvador invita a
        descubrir su esencia. Su gente, conocida por su hospitalidad, y sus
        paisajes únicos hacen de este país un destino auténtico en
        Centroamérica.
      </div>
    </div>
  );
};

export default MainDestinosText;