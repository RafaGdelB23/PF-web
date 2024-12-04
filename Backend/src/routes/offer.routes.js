import express from "express";
import {
  addNewOffer,
  deleteOffer,
  editOffer,
  showOffersByCategory,
  showOfferById,
  findOffersBySubcategory,
  findOffersByCategoryAndSubcategory
} from "../controllers/offer.controller.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addOfferValidationRules,
  editOfferValidationRules,
  deleteOfferValidationRules,
  findOffersByCategoryAndSubcategoryValidationRules
} from "../validators/offer.validator.js";

const OfferRouter = express.Router();

OfferRouter.get("/:category", showOffersByCategory);
OfferRouter.get("/:category/:id", showOfferById);
OfferRouter.get("/subCategoryPackage/:subcategory", findOffersBySubcategory);
OfferRouter.post("/addOffer", authMiddleware, addOfferValidationRules(), validate, addNewOffer);
OfferRouter.put("/editOffer/:id", authMiddleware, editOfferValidationRules(), validate, editOffer);
OfferRouter.delete("/deleteOffer/:id", authMiddleware, deleteOfferValidationRules(), validate, deleteOffer);
OfferRouter.get("/:category/:subcategory", findOffersByCategoryAndSubcategoryValidationRules(), findOffersByCategoryAndSubcategory);


export default OfferRouter;
