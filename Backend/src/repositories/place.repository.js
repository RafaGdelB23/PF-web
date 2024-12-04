import Place from "../models/place.model.js";
import Offer from "../models/offer.model.js";
import mongoose from 'mongoose';

/**
 * @returns {Promise<Place[]>}
 */
export const findAllPlaces = async () => {
  return await Place.find();
};

/**
 * @param {string} id
 * @returns {Promise<Place|null>}
 */
export const findPlaceById = async (id) => {
  try {
    const place = await Place.findById(id);
    return place;
  } catch (error) {
    console.error(error);
    throw new Error("Error al buscar el lugar");
  }
};

/**
 * @param {string} category
 * @returns {Promise<Place[]>}
 */
export const findPlacesByCategory = async (category) => {
  return await Place.find({ category });
};

/**
 * @param {Object} placeData
 * @returns {Promise<Place>}
 */
export const createPlace = async (placeData) => {
  const newPlace = new Place(placeData);
  return await newPlace.save();
};

/**
 * @param {string} id
 * @param {Object} updatedData
 * @returns {Promise<Place|null>}
 */
export const updatePlace = async (id, updatedData) => {
  return await Place.findByIdAndUpdate(id, updatedData, { new: true });
};

/**
 * @param {string} id
 * @returns {Promise<Place|null>}
 */
export const deletePlaceById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID del lugar no válido");
  }
  return await Place.findByIdAndDelete(id);
};
