import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getToken } from "../../utils/Utils";  
import "./HistorialPagos.css";

const HistorialCompras = () => {
  const { user } = useContext(AuthContext);  
  const [completedPurchases, setCompletedPurchases] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const URL = import.meta.env.VITE_BASE_URL;  

  useEffect(() => {
    if (user) {
      const fetchCompletedPurchases = async () => {
        const token = getToken(); 

        if (!token) {
          setError("Por favor, inicia sesión para ver tus compras.");
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(`${URL}/api/purchases/history`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("No se pudieron obtener las compras completadas.");
          }

          const data = await response.json();
          setCompletedPurchases(data.purchases || []); 
        } catch (error) {
          setError(error.message); 
        } finally {
          setIsLoading(false);  
        }
      };

      fetchCompletedPurchases();
    } else {
      setIsLoading(false);
    }
  }, [user]); 

  if (!user) {
    return <p>Debes iniciar sesión para ver tus compras.</p>;
  }

  if (isLoading) {
    return <p>Cargando tus compras...</p>;
  }

  if (error) {
    return <p>{error}</p>; 
  }

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    };

    const formattedDate = new Date(date).toLocaleString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="historial-compras-container">
      <h1>Historial de Compras</h1>
        <div className="compras-list">
          {completedPurchases.map((purchase) => (
            <div key={purchase._id} className="compra-item">
              <div className="compra-image-container">
                {purchase.offer?.img ? (
                  <img 
                    src={purchase.offer.img} 
                    alt={purchase.offer.name} 
                    className="compra-image" 
                  />
                ) : (
                  <img 
                    src="/path/to/default-image.jpg" 
                    alt="Oferta no disponible" 
                    className="compra-image" 
                  />
                )}
              </div>

              <div className="compra-details">
                <h3>{purchase.offer?.name}</h3>
                <p><strong>Lugar:</strong> {purchase.offer.location}</p>
                <p><strong>Cantidad:</strong> {purchase.quantity}</p>
                <p><strong>Total:</strong> ${purchase.total}</p>
                <p><strong>Hora de compra:</strong> {formatDate(purchase.createdAt)}</p> 
                <p><strong>Estado:</strong> {purchase.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) 
    </div>
  );
};

export default HistorialCompras;
