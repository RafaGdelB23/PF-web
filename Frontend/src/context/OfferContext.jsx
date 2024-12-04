import React, { createContext, useState, useContext } from "react";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const updateOffer = (updatedOffer) => {
    setOffers((prevOffers) => {
      return prevOffers.map((offer) =>
        offer._id === updatedOffer._id ? updatedOffer : offer
      );
    });
  };

  const addOffer = (newOffer) => {
    setOffers((prevOffers) => [...prevOffers, newOffer]);
  };

  const deleteOffer = (offerId) => {
    setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
  };

  return (
    <OfferContext.Provider value={{ offers, updateOffer, addOffer, deleteOffer }}>
      {children}
    </OfferContext.Provider>
  );
};

const useOfferContext = () => {
  return useContext(OfferContext);
};

export { OfferProvider, useOfferContext };
