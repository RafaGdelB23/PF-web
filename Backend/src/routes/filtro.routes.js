import express from "express";
import {
  findFiltroById,
  createFiltro,
  updateFiltro,
  removeFiltro,
  findAllFiltros,
  searchFilters
} from "../controllers/filtro.controller.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addFilterValidationRules, editFilterValidationRules, deleteFilterValidationRules } from "../validators/filtro.validator.js";

const FilterRouter = express.Router();

FilterRouter.post("/addFilter", authMiddleware, addFilterValidationRules, validate, createFiltro);
FilterRouter.get("/PersonalizarViaje", findAllFiltros);
FilterRouter.get("/filter/:id", findFiltroById);
FilterRouter.put("/editFilter/:id", authMiddleware, editFilterValidationRules, validate, updateFiltro);
FilterRouter.delete("/deleteFilter/:id", authMiddleware, deleteFilterValidationRules, removeFiltro);
FilterRouter.get("/searchFilters", searchFilters);

export default FilterRouter;