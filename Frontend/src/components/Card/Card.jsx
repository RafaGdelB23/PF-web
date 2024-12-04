import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import images from "../../public/img/images.js";

const URL = import.meta.env.VITE_BASE_URL;

const Card = ({
  id,
  image,
  image2,
  title,
  duration,
  price,
  location,
  isFavorite,
  fav,
}) => {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);

  const handleFavorite = async () => {
    setFavoriteStatus(!favoriteStatus);
    fav(id, !favoriteStatus);
  };

  return (
    <div className="card-ofertas">
      <div className="mainImg-ofertas">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="categoryImg-ofertas">
        <img src={image2} className="category-image" />
      </div>
      <div className="card-content">
        <h3>
          <strong>{title}</strong>
        </h3>
        <p>{duration}</p>
        <p>{price}</p>
        <p>{location}</p>
        <div className="cards-buttons">
          <button onClick={handleFavorite} className="favorite-button">
            <img
              src={favoriteStatus ? images.FavoritosActive : images.Favoritos}
              alt="Favoritos"
              className={`favorite-icon ${favoriteStatus ? "active" : ""}`}
            />
          </button>
          <Link to={`/Oferta/${id}`} className="more-info-button">
            <img src={images.MasInfo} alt="Más información" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
