import express from "express";
import { initiatePurchase, addDuiToPurchase, confirmPayment, editPurchase, deletePurchase, getCompletedPurchases} from "../controllers/purchase.controller.js";
import { initiatePurchaseValidationRules, addDuiValidationRules, confirmPaymentValidationRules, editPurchaseValidationRules, deletePurchaseValidationRules } from "../validators/purchase.validator.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const PurchaseRouter = express.Router();

PurchaseRouter.post("/initiatePurchase", initiatePurchaseValidationRules(), validate, authMiddleware, initiatePurchase);
PurchaseRouter.put("/:purchaseId/add-dui", addDuiValidationRules(), validate, authMiddleware, addDuiToPurchase);
PurchaseRouter.post("/:purchaseId/confirm-payment", confirmPaymentValidationRules(), validate, authMiddleware, confirmPayment);
PurchaseRouter.put("/:id", editPurchaseValidationRules(), validate, authMiddleware, editPurchase);
PurchaseRouter.delete("/:id", deletePurchaseValidationRules(), validate, authMiddleware, deletePurchase);
PurchaseRouter.get("/history", authMiddleware, getCompletedPurchases);

export default PurchaseRouter;
