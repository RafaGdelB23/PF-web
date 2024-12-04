import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Header from "../Header/Header.jsx";
import NavBar from "../NavBar/NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch.jsx";
import { CiHeart } from "react-icons/ci";
import CommentForm from "../Comments/Comments.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getToken } from "../../utils/Utils";
import "./PlantillaOffer.css";

const OfertasInformacion = () => {
  const [cantidad, setCantidad] = useState(1);
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [total, setTotal] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id, category } = useParams();
  const URL = import.meta.env.VITE_BASE_URL;
  const { data, loading, error } = useFetch(
    `${URL}/api/offers/${category}/${id}`
  );
  const offerData = data?.offer || {};

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isOfferInFavorites = favorites.some(
      (fav) => fav._id === offerData._id
    );
    setIsFavorite(isOfferInFavorites);
  }, [offerData]);

  const handleFavoriteClick = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav._id !== offerData._id);
      setIsFavorite(false);
    } else {
      favorites.push(offerData);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const savedComments =
      JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleCommentSubmit = (newComment, rating) => {
    const newCommentData = {
      text: newComment,
      rating: rating,
      userFirstName: user?.firstName || "Anónimo",
      userLastName: user?.lastName || "",
      date: new Date().toLocaleDateString(),
    };

    const updatedComments = [...comments, newCommentData];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setShowCommentForm(false);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
  };

  const handleCommentButtonClick = () => {
    if (!user) {
      alert("Necesitas estar logueado para dejar un comentario");
      navigate("/Login");
    } else {
      setShowCommentForm(!showCommentForm);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.replace("$", ""));
  };

  useEffect(() => {
    if (offerData.price) {
      const pricePerPerson = formatPrice(offerData.price);
      setTotal(pricePerPerson * cantidad);
    }
  }, [cantidad, offerData.price]);

  const handlePurchase = async () => {
    if (!fecha || !horario) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }
    if (!user) {
      navigate("/Login");
      return;
    }

    const formatDate = (date) => {
      const d = new Date(date);
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const formatTime = (time) => {
      const [hourMinute, period] = time.split(" ");
      let [hour, minute] = hourMinute.split(":");
      hour = parseInt(hour);

      if (period === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period === "AM" && hour === 12) {
        hour = 0;
      }

      return `${hour.toString().padStart(2, "0")}:${minute}`;
    };

    const formattedDate = formatDate(fecha);
    const formattedTime = formatTime(horario);

    const purchaseData = {
      offer: id,
      quantity: cantidad,
      date: formattedDate,
      time: formattedTime,
    };

    const token = getToken();
    if (!token) {
      alert("Por favor, inicia sesión para realizar la compra.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/purchases/initiatePurchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/purchase", {
          state: {
            offerId: id,
            offerName: offerData.name,
            price: offerData.price,
            quantity: cantidad,
            fecha: formattedDate,
            horario: formattedTime,
            total: total,
            purchaseId: result.purchaseId,
          },
        });
      } else {
        alert(result.message || "Hubo un error al realizar la compra.");
      }
    } catch (error) {
      console.error("Error en la compra:", error);
      alert("Hubo un problema al realizar la compra.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos.</div>;

  return (
    <div className="packageInformation-container">
      <Header />
      <NavBar />
      <div className="headerPage">
        <div className="header-content">
          <h1>{offerData.name}</h1>
          <button onClick={handleFavoriteClick}>
            <CiHeart className="iconHeart" />
            {isFavorite ? "Eliminar de favoritos" : "Guardar en favoritos"}
          </button>
        </div>
        <div className="imgPackage">
          <img src={offerData.mainImg} alt={offerData.name} />
        </div>
      </div>
      <div className="informationPackage">
        <div className="aboutPackage">
          <h3>Acerca de...</h3>
          <hr />
          <p>{offerData.description}</p>
          <div className="listPackage">
            <ul>
              <li>
                <strong>Excursiones de:</strong> {offerData.duration}
              </li>
              <li>
                <strong>Precio:</strong> {offerData.price}
              </li>
              <li>
                <strong>Lugar:</strong> {offerData.location}
              </li>
            </ul>
          </div>
        </div>
        <div className="functionPackage">
          <h3>Compra de oferta</h3>
          <div className="datePackage">
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={fecha}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="cantidadPersonas">
            <label htmlFor="cantidad">Personas:</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              min="1"
              max="8"
              step="1"
              value={cantidad}
              onChange={(e) => {
                let value = e.target.value;
                if (
                  value === "" ||
                  (/^\d+$/.test(value) && value >= 1 && value <= 8)
                ) {
                  setCantidad(value);
                }
              }}
            />
          </div>
          <div className="horarios-container">
            <label htmlFor="horarios" className="horarios-label">
              Seleccione un horario:
            </label>
            <div className="horarios">
              {[offerData.horario1, offerData.horario2, offerData.horario3]
                .filter(Boolean)
                .map((horarioDisponible, index) => (
                  <div
                    key={index}
                    className={horario === horarioDisponible ? "selected" : ""}
                    onClick={() => setHorario(horarioDisponible)}
                  >
                    {horarioDisponible}
                  </div>
                ))}
            </div>
          </div>
          <div className="totalPrice">
            <p>Total a pagar: ${total}</p>
            <button onClick={handlePurchase}>Comprar</button>
          </div>
        </div>
      </div>

      <div className="comments-container">
        <h3>Hacer un aporte...</h3>
        <button className="commentButton" onClick={handleCommentButtonClick}>
          {showCommentForm ? "Cancelar comentario" : "Escribir comentario"}
        </button>
        {showCommentForm && user && (
          <CommentForm onSubmit={handleCommentSubmit} />
        )}
        <div className="comentarioUser-container">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div className="comentario-individual" key={index}>
                <div className="headerComment">
                  <StarRatings
                    rating={comment.rating}
                    starDimension="20px"
                    starSpacing="5px"
                    starRatedColor="gold"
                  />
                  {user && (
                    <button
                      className="delete-comment"
                      onClick={() => handleDeleteComment(index)}
                    >
                      Eliminar
                    </button>
                  )}
                  <h3>
                    {comment.userFirstName} {comment.userLastName}
                  </h3>
                  <p className="fechaComment">{comment.date}</p>
                  <hr />
                </div>
                <div className="comentario">
                  <p>{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay comentarios aún en este apartado.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfertasInformacion;
