import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getToken } from "../../../utils/Utils"; 
import "../Purchase.css";

const PaymentForm = ({ onPrevious, offerData }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("01");
  const [expiryYear, setExpiryYear] = useState("2024");
  const [cvc, setCvc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { purchaseId } = location.state || {};

  const URL = import.meta.env.VITE_BASE_URL;

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handlePayment = async () => {
    const newErrors = {};

    const cardNumberClean = cardNumber.replace(/\s+/g, "");
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumberClean)) {
      newErrors.cardNumber = "Por favor, ingresa un número de tarjeta válido de 16 dígitos.";
    }

    if (!cardName.trim()) {
      newErrors.cardName = "Por favor, ingresa el nombre que aparece en la tarjeta.";
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const selectedYear = parseInt(expiryYear, 10);
    const selectedMonth = parseInt(expiryMonth, 10);

    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth)
    ) {
      newErrors.expiryDate = "La fecha de vencimiento no puede ser en el pasado.";
    }

    const cvcRegex = /^\d{3,4}$/;
    if (!cvcRegex.test(cvc)) {
      newErrors.cvc = "Por favor, ingresa un CVC válido de 3 o 4 dígitos.";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones para continuar.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const paymentData = {
      cardNumber: cardNumberClean,
      cardName,
      expMonth: expiryMonth,
      expYear: expiryYear,
      cvc,
    };

    const purchaseData = {
      offer: offerData.offerId,
      quantity: offerData.quantity,
      total: offerData.total,
    };

    if (!purchaseId) {
      console.error("El ID de la compra no está definido.");
      alert("Error: No se pudo identificar la compra. Por favor, intenta nuevamente.");
      return;
    }

    const token = getToken(); 
    if (!token) {
      alert("No se encontró el token de autenticación. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/purchases/${purchaseId}/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ ...purchaseData, ...paymentData }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Error desconocido en el servidor.");
      }

      const result = await response.json();
    } catch (error) {
      console.error("Error procesando el pago:", error.message);
      alert(`Error procesando el pago: ${error.message}`);
    }
  };

  const yearsRange = Array.from({ length: 21 }, (_, i) => 2024 + i);

  console.log(offerData); 

  return (
    <div className="payment-layout">
      <div className="payment-details">
        <h1>Detalles de Pago</h1>
        <form autoComplete="off">
          <label>Número de Tarjeta</label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            autoComplete="off"
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <label>Nombre en la Tarjeta</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.replace(/[0-9]/g, ""))}
            autoComplete="off"
          />
          {errors.cardName && <p className="error-message">{errors.cardName}</p>}

          <div className="row">
            <div>
              <label>Mes</label>
              <select
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Año</label>
              <select
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              >
                {yearsRange.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}

          <label>CVC</label>
          <input
            type="text"
            placeholder="XXX"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
          {errors.cvc && <p className="error-message">{errors.cvc}</p>}

          <div className="terms">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="termsAccepted">
              Acepto los <a href="/TerminosCondiciones">términos y condiciones</a> de pago.
            </label>
          </div>
          {errors.termsAccepted && <p className="error-message">{errors.termsAccepted}</p>}

          <div className="actions">
            <button type="button" onClick={onPrevious}>
              Volver
            </button>
            <button type="button" onClick={handlePayment}>
              Proceder a Pagar
            </button>
          </div>
        </form>
      </div>

      <div className="order-summary">
        <h3>Resumen de la Orden</h3>
        {offerData && offerData.offerName ? (
          <>
            <p><strong>Oferta:</strong> {offerData.offerName}</p>
            <p><strong>Cantidad:</strong> {offerData.quantity}</p>
            <p><strong>Total:</strong> ${offerData.total}</p>
          </>
        ) : (
          <p>No se encontraron los detalles de la oferta.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
