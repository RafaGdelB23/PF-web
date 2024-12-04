import * as placeService from "../services/place.service.js";

// Agregar lugar
export const addNewPlace = async (req, res) => {
  try {
    const place = req.body;
    const userRole = req.user?.role;
    const newPlace = await placeService.addPlace(place, userRole);
    res
      .status(201)
      .json({ message: "Lugar creado exitosamente", place: newPlace });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error inesperado" });
  }
};

// Editar lugar
export const editPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlace = req.body;
    const userRole = req.user.role;
    const place = await placeService.editPlace(id, updatedPlace, userRole);
    res.status(200).json({ message: "Lugar actualizado", place });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error inesperado" });
  }
};

// Eliminar lugar
export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role;
    await placeService.deleteOldPlace(id, userRole);
    res.status(200).json({ message: "Lugar eliminado exitosamente" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error inesperado" });
  }
};

// Obtener lugar por ID
export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await placeService.PlaceById(id);
    res.status(200).json(place);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error inesperado" });
  }
};

// Obtener lugares por categoría
export const getPlacesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const places = await placeService.placesByCategory(category);
    res.status(200).json(places);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error inesperado" });
  }
};

export const getPlaceWithOffers = async (req, res) => {

  try {
    const { placeId } = req.params;
    const placeData = await placeService.PlaceById(placeId).populate("offersId");

    if (!placeData) {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }

    return res.status(200).json(placeData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Error al obtener el lugar: ${error.message}` });
  }
};
