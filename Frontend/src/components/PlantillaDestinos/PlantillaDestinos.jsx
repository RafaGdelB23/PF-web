import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header.jsx";
import NavBar from "../NavBar/NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import useFetch from "../../hooks/UseFetch.jsx";
import pagesConfig from "../../config/pagesConfig.jsx";
import CardDestino from "../CardDestino.jsx";
import "./PlantillaDestinos.css";

const PlantillaDestinos = () => {
  const { category } = useParams();
  const URL = import.meta.env.VITE_BASE_URL;

  const { data } = useFetch(`${URL}/api/places/Destinos/${category}`);
  const [information, setInformation] = useState([]);
  const [pageDetails, setPageDetails] = useState(null);

  useEffect(() => {
    if (data) {
      setInformation(data);
    }
    const details = pagesConfig.find((config) =>
      config.path.includes(category)
    );
    setPageDetails(details || null);
  }, [data, category]);

  return (
    <div className="PlantillaDestinos-container">
      <Header />
      <NavBar />
      <div className="plantillaDestinos-information">
        {pageDetails && (
          <div className="category-header">
            <div className="container-heropageDestino">
              <h1>{pageDetails.title}</h1>
              <img src={pageDetails.img} alt={pageDetails.title} />
            </div>
            <div className="textDestinos">
              <p className="main-text-destino">{pageDetails.text}</p>
              <p>{pageDetails.text2}</p>
            </div>
          </div>
        )}
        <div className="cardsDestinos-content">
          {information.map((place) => (
            <CardDestino
              key={place._id}
              id={place._id}
              img={place.mainImg}
              place={place.namePlace}
              location={place.location}
            />
          ))}
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default PlantillaDestinos;
