import React from "react";
import images from "../../../public/img/images";
import "./HeroPage.css";

const HeroPage = () => {
  return (
    <div className="container-heropage">
      <img src={images.HeroPage} alt="HeroPage" />
      <div className="text-HeroPage">
        <span className="lines"></span>
        <h2>EL SALVADOR</h2>
        <h3>NATURALEZA, CULTURA Y AVENTURA EN UN SOLO DESTINO</h3>
        <span className="lines"></span>
      </div>
    </div>
  );
};

export default HeroPage;