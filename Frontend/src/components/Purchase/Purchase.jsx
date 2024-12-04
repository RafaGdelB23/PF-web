import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestDUI from "../Purchase/RequestDUI/RequestDUI";  
import PaymentForm from "../Purchase/PaymentForm/PaymentForm"; 
import "./Purchase.css"; 

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [dui, setDui] = useState(""); 

  const initialOfferData = location.state || {};

  const [selectedOffer, setSelectedOffer] = useState({
    offerId: initialOfferData.offerId || "",
    offerName: initialOfferData.offerName || "",
    price: initialOfferData.price || 0,
    quantity: initialOfferData.quantity || 1,
    date: initialOfferData.date || "",
    schedule: initialOfferData.schedule || "",
    total: initialOfferData.total || 0,
    purchaseId: initialOfferData.purchaseId || "", 
  });

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setSelectedOffer(location.state); 
    }
  }, [location.state]);

  const steps = ["Información", "Pago"];

  const goToNextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="purchase-cont">
      <div className="purchase-container">
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`progress-bar-step ${
                index + 1 <= currentStep ? "completed" : ""
              }`}
            >
              <div
                className={`step-circle ${
                  index + 1 === currentStep ? "active" : ""
                }`}
              >
                {index + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <RequestDUI 
            dui={dui} 
            setDui={setDui} 
            onNext={goToNextStep} 
            purchaseId={selectedOffer.purchaseId} 
          />
        )}

        {currentStep === 2 && (
          <PaymentForm
            offerData={selectedOffer} 
            onPrevious={goToPreviousStep}
            purchaseId={selectedOffer.purchaseId} 
          />
        )}
      </div>
    </div>
  );
};

export default Purchase;
