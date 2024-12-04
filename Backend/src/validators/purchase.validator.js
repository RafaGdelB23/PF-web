import { body, param } from "express-validator";

export const initiatePurchaseValidationRules = () => {
  return [
    body("offer").isMongoId().withMessage("El ID de la oferta no es válido"),
    body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser al menos 1"),
    body("date")
      .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/)
      .withMessage("La fecha debe estar en formato MM/DD/YYYY"),
    body("time")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("El horario debe estar en formato HH:mm (24 horas)"),
  ];
};

export const addDuiValidationRules = () => {
  return [
    param("purchaseId").isMongoId().withMessage("El ID de la compra no es válido"),
    body("dui").matches(/^\d{8}-\d$/).withMessage("El DUI debe tener el formato XXXXXXXX-X"),
  ];
};

export const confirmPaymentValidationRules = () => {
  return [
    param("purchaseId").isMongoId().withMessage("El ID de la compra no es válido"),
    body("cardNumber").matches(/^\d{16}$/).withMessage("El número de la tarjeta debe tener 16 dígitos"),
    body("cardName").notEmpty().withMessage("El nombre del titular de la tarjeta es obligatorio"),
    body("expMonth").matches(/^(0[1-9]|1[0-2])$/).withMessage("El mes de expiración debe estar entre 01 y 12"),
    body("expYear").matches(/^\d{4}$/).withMessage("El año de expiración debe tener 4 dígitos"),
    body("cvc").matches(/^\d{3,4}$/).withMessage("El código de seguridad (CVC) debe tener 3 o 4 dígitos"),
  ];
};

export const editPurchaseValidationRules = () => {
  return [
    param("id").isMongoId().withMessage("El ID de la compra no es válido"),
    body("offer").optional().isMongoId().withMessage("El ID de la oferta debe ser válido"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("La cantidad debe ser al menos 1"),
    body("dui").optional().matches(/^\d{8}-\d$/).withMessage("El DUI debe tener el formato XXXXXXXX-X"),
  ];
};

export const deletePurchaseValidationRules = () => {
  return [
    param("id").isMongoId().withMessage("El ID de la compra no es válido"),
  ];
};
