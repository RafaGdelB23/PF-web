import express from "express";
import {
  addNewPlace,
  editPlace,
  deletePlace,
  getPlaceById,
  getPlacesByCategory,

} from "../controllers/place.controller.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addPlaceValidationRules,
  editPlaceValidationRules,
  deletePlaceValidationRules,
} from "../validators/place.validator.js";

const PlacesRoutes = express.Router();

PlacesRoutes.get("/Destino/:id", getPlaceById);
PlacesRoutes.get("/Destinos/:category", getPlacesByCategory);
PlacesRoutes.post("/addPlace", authMiddleware, addPlaceValidationRules(), validate, addNewPlace);
PlacesRoutes.put("/editPlace/:id", authMiddleware, editPlaceValidationRules(), validate, editPlace);
PlacesRoutes.delete("/deletePlace/:id", authMiddleware, deletePlaceValidationRules(), validate, deletePlace);

export default PlacesRoutes;
