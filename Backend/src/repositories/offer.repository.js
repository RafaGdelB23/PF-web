import mongoose from "mongoose";
import Offer from "../models/offer.model.js";

export const findOfferById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de oferta no válido");
  }
  return await Offer.findById(id);
};

export const findOfferByName = async (name) => {
  return await Offer.findOne({ name });
};

export const findAllOffers = async () => {
  return await Offer.find();
};

export const findOffersByCategory = async (category) => {
  return await Offer.find({ category });
};


export const findOffersBySubcategory = async (subcategory) => {
  try {
    return await Offer.find({ subcategory });
  } catch (error) {
    throw new Error("Error al buscar ofertas por subcategoría");

  }
};

export const createOffer = async (offerData) => {
  const offer = new Offer(offerData);
  return await offer.save();
};

export const updateOffer = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de oferta no válido");
  }
  return await Offer.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

export const deleteOfferById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de oferta no válido");
  }
  return await Offer.findByIdAndDelete(id);
};

export const findOffersByPlaceId = async (placeId) => {
  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new Error("ID de lugar no válido");
  }
  return await Offer.find({ placeId }).populate('placeId');
};

export const findOffersByCategoryAndSubcategory = async (category, subcategory) => {
  try {
    return await Offer.find({ 
      category: category, 
      subcategory: subcategory 
    });
  } catch (error) {
    throw new Error("Error al buscar ofertas por categoría y subcategoría");
  }
};
