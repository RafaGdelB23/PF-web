import * as PlaceRepository from "../repositories/place.repository.js";
import mongoose from 'mongoose';
import { 
  PlaceNotFoundError, 
  UnauthorizedPlaceActionError, 
  InvalidPlaceDataError, 
  PlaceOperationError 
} from "../errors/errors.places.js";

export const addPlace = async (placeData, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedPlaceActionError("Solo los administradores pueden agregar lugares");
  }

  try {
    const newPlace = await PlaceRepository.createPlace(placeData);
    return newPlace;
  } catch (error) {
    throw new PlaceOperationError("Error al agregar el lugar.");
  }
};

export const editPlace = async (placeId, updatedPlace, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedPlaceActionError();
  }

  try {
    const place = await PlaceRepository.findPlaceById(placeId);
    if (!place) {
      throw new PlaceNotFoundError();
    }

    const updated = await PlaceRepository.updatePlace(placeId, updatedPlace);
    return updated;
  } catch (error) {
    throw new PlaceOperationError("Error al editar el lugar.");
  }
};

export const deleteOldPlace = async (placeId, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedPlaceActionError();
  }

  try {
    const deletedPlace = await PlaceRepository.deletePlaceById(placeId);
    if (!deletedPlace) {
      throw new PlaceNotFoundError();
    }
    return deletedPlace;
  } catch (error) {
    throw new PlaceOperationError("Error al eliminar el lugar.");
  }
};

export const placesByCategory = async (category) => {
  try {
    const places = await PlaceRepository.findPlacesByCategory(category);
    return places;
  } catch (error) {
    console.error(error);
  }
};

export const PlaceById = async (id) => {
  try {
    const place = await PlaceRepository.findPlaceById(id);
    return place;
  } catch (error) {
    console.error(error);
  }
};