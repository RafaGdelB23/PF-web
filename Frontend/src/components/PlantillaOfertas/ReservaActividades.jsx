import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card.jsx";
import useFetch from "../../hooks/UseFetch.jsx";
import Header from "../Header/Header.jsx";
import NavBar from "../NavBar/NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./PlantillaOfertas.css";

const Actividades = () => {
  const { category } = useParams();
  const { user } = useContext(AuthContext);
  const [information, setInformation] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const URL = import.meta.env.VITE_BASE_URL;

  const { data } = useFetch(`${URL}/api/offers/${category}`);

  useEffect(() => {
    if (data && data.offers) {
      setInformation(data.offers);
    } else {
      setInformation([]);
    }

    if (user) {
      const favoritesKey = `favorites_${user.id}`;
      const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [data, user]);

  const handleFavorite = (offer) => {
    if (!user) {
      alert("Necesitas estar logueado para modificar favoritos");
      return;
    }

    const favoritesKey = `favorites_${user.id}`;
    let updatedFavorites = [...favorites];
    const isOfferInFavorites = favorites.some((fav) => fav._id === offer._id);

    if (isOfferInFavorites) {
      updatedFavorites = updatedFavorites.filter((fav) => fav._id !== offer._id);
    } else {
      updatedFavorites.push(offer);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  const subcategoryActivity = information.reduce((acc, offer) => {
    const { subcategory } = offer;
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(offer);
    return acc;
  }, {});

  return (
    <div className="offers-container">
      <Header />
      <NavBar />
      <div className="activity-container">
        <h3>Reserva de actividades</h3>
        <hr />
      </div>
      <div className="Offer-content">
        {Object.keys(subcategoryActivity).map((subcategory) => (
          <div className="subcategoryTitle" key={subcategory}>
            <h4>{subcategory}</h4>
            <div className="cards">
              {subcategoryActivity[subcategory].map((offer) => (
                <Card
                  key={offer._id}
                  id={offer._id}
                  image={offer.img}
                  image2={offer.categoryImg}
                  title={offer.name}
                  duration={offer.duration}
                  price={`${offer.price}`}
                  location={offer.location}
                  fav={() => handleFavorite(offer)}
                  isFavorite={favorites.some((fav) => fav._id === offer._id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Actividades;