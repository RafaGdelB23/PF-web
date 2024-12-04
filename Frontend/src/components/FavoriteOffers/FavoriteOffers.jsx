import React, { useEffect, useState, useContext } from "react";
import Card from "../Card/Card.jsx";
import "./FavoriteOffers.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const FavoriteOffers = () => {
  const [favoriteOffers, setFavoriteOffers] = useState({
    packages: [],
    activities: []
  });
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const favoritesKey = `favorites_${user.id}`;
      const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
      const packages = favorites.filter(fav => fav.category === "Package");
      const activities = favorites.filter(fav => fav.category === "Activity");
      setFavoriteOffers({ packages, activities });
    }
  }, [user]);

  const handleRemoveFavorite = (offer) => {
    if (!user) {
      alert("Necesitas estar logueado para realizar esta acción");
      return;
    }

    const favoritesKey = `favorites_${user.id}`;
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    favorites = favorites.filter(fav => fav._id !== offer._id);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));

    if (offer.category === "Package") {
      setFavoriteOffers(prev => ({
        ...prev,
        packages: prev.packages.filter(pack => pack._id !== offer._id)
      }));
    } else if (offer.category === "Activity") {
      setFavoriteOffers(prev => ({
        ...prev,
        activities: prev.activities.filter(act => act._id !== offer._id)
      }));
    }
  };

  return (
    <div className="FavoriteOffers-container">
      <div className="favoritesPackages">
        <h3>Paquetes turísticos</h3>
        <div className="cards-favorites">
          {favoriteOffers.packages.length > 0 ? (
            favoriteOffers.packages.map(offer => (
              <Card
                key={offer._id}
                id={offer._id}
                image={offer.img}
                image2={offer.categoryImg}
                title={offer.name}
                duration={offer.duration}
                price={offer.price}
                location={offer.location}
                fav={() => handleRemoveFavorite(offer)}
                isFavorite={true}
              />
            ))
          ) : (
            <p className="cardText">No tienes paquetes añadidos como favoritos.</p>
          )}
        </div>
      </div>
      <div className="FavoriteActivities">
        <h3>Actividades reservadas</h3>
        <div className="cards-favorites">
          {favoriteOffers.activities.length > 0 ? (
            favoriteOffers.activities.map(offer => (
              <Card
                key={offer._id}
                id={offer._id}
                image={offer.img}
                image2={offer.categoryImg}
                title={offer.name}
                duration={offer.duration}
                price={offer.price}
                location={offer.location}
                fav={() => handleRemoveFavorite(offer)}
                isFavorite={true}
              />
            ))
          ) : (
            <p className="cardText">No tienes actividades añadidas como favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteOffers;
