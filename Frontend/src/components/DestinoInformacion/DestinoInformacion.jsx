import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch.jsx";
import Header from "../Header/Header.jsx";
import NavBar from "../NavBar/NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./DestinoInformacion.css";

const URL = import.meta.env.VITE_BASE_URL;
const DestinosInformacion = () => {
  const { id } = useParams();

  const { data: placeData } = useFetch(`${URL}/api/places/Destino/${id}`);

  const handleFavorite = (id, isFavorite) => {
    console.log(`Offer ${id} is ${isFavorite ? "favorite" : "not favorite"}`);
  };

  return (
    <div className="DestinoInformacion-container">
      <Header />
      <NavBar />
      <div className="mainPlace-content">
        <div className="introPlace">
          <h1>{placeData?.namePlace}</h1>
        </div>
        <div className="place-gallery">
          <img
            className="DestinoInfo-imagenes-main"
            src={placeData?.mainImg}
            alt={placeData?.namePlace}
          />
          <div className="DestinoInfo-imagenes">
            <img src={placeData?.subImg1} alt="Subimagen 1" />
            <img src={placeData?.subImg2} alt="Subimagen 2" />
          </div>
        </div>
        <div className="info-container">
          <div className="Informacion">
            <h2>
              <strong>Acerca de...</strong>
            </h2>
            <p>{placeData?.aboutPlace}</p>
          </div>
          <div className="place-advices">
            <h2>
              <strong>Nuestras recomendaciones y consejos...</strong>
            </h2>
            <p>{placeData?.placeAdvices}</p>
          </div>
        </div>
        <div className="ubicationPlace-container">
          <h2>¿Cómo llegar?</h2>
          <iframe src={placeData?.map} allowFullScreen title="Mapa"></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DestinosInformacion;
