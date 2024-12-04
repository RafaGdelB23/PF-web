import React from "react";
import images from "../../../public/img/images";
import Video from "../../../public/Video/VideoPlayer";
import "./Main-info.css";

const MainInfo = () => {
  return (
    <div className="main-container">
      <div className="videos">
        <video src={Video.Video1} autoPlay></video>
        <video src={Video.Video2} autoPlay></video>
      </div>
      <h2 id="MainText">TENEMOS LOS MEJORES DESTINOS</h2>
      <div className="mainImages-grid">
        <div className="image-container">
          <img src={images.Playa} alt="Playa" />
          <div className="overlay">PLAYAS PARADISÍACAS</div>
        </div>
        <div className="image-container">
          <img src={images.Volcan} alt="Volcan" />
          <div className="overlay">VOLCANES MAJESTUOSOS</div>
        </div>
        <div className="image-container">
          <img src={images.Ciudad} alt="Ciudad" />
          <div className="overlay">CIUDADES PRECIOSAS</div>
        </div>
        <div className="image-container">
          <img src={images.Museo} alt="Museo" />
          <div className="overlay">MUSEOS INIGUALABLES</div>
        </div>
      </div>
      <p id="MainText2">
        ¡Explora el mundo con nosotros!
        <br /> Descubre destinos únicos y
        <br /> experiencias inolvidables.
      </p>
    </div>
  );
};

export default MainInfo;