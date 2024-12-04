import * as purchaseRepository from "../repositories/purchase.repository.js";
import * as offerRepository from "../repositories/offer.repository.js";
import mongoose from "mongoose";
import {
  PurchaseNotFoundError,
  InvalidPurchaseError,
  PurchaseAlreadyProcessedError,
} from "../errors/errors.purchases.js";

/**
 * 
 * @param {Object} purchaseData 
 * @param {string} purchaseData.user
 * @param {string} purchaseData.offer 
 * @param {number} purchaseData.quantity 
 * @param {string} purchaseData.date 
 * @param {string} purchaseData.time 
 * @returns {Promise<Object>} 
 */
export const initiatePurchase = async ({ user, offer, quantity, date, time }) => {
  try {
    console.log("Datos recibidos para iniciar compra:", { user, offer, quantity, date, time });

    const existingOffer = await offerRepository.findOfferById(offer);
    if (!existingOffer) {
      console.error("La oferta no existe");
      throw new Error("La oferta no existe");
    }

    console.log("Oferta encontrada:", existingOffer);

    const priceString = existingOffer.price.replace("$", "").trim(); 
    const price = parseFloat(priceString);
    if (isNaN(price)) {
      throw new Error("El precio de la oferta no es un número válido");
    }

    const total = price * quantity;  
    console.log("Precio convertido:", price);
    console.log("Total calculado:", total);

    const purchase = await purchaseRepository.createPurchase({
      user,
      offer,
      quantity,
      price,
      total,
      date,
      time,
      status: "pendiente",  
    });

    console.log("Compra inicializada:", purchase);
    return purchase;
  } catch (error) {
    console.error("Error en initiatePurchase:", error);
    throw new Error("Error al crear la compra");
  }
};

/**
 * 
 * @param {string} purchaseId -
 * @param {string} dui 
 * @returns {Promise<Object>} 
 */
export const addDuiToPurchase = async (purchaseId, dui) => {
  if (!mongoose.Types.ObjectId.isValid(purchaseId)) {
    throw new InvalidPurchaseError("ID de compra no válido");
  }

  const purchase = await purchaseRepository.findPurchaseById(purchaseId);
  if (!purchase) {
    throw new PurchaseNotFoundError("Compra no encontrada");
  }

  const updatedPurchase = await purchaseRepository.updatePurchaseById(purchaseId, { dui });
  console.log("DUI agregado a la compra:", updatedPurchase);

  return updatedPurchase;
};

/**
 * 
 * @param {string} purchaseId
 * @param {Object} cardDetails 
 * @returns {Promise<Object>} 
 */
export const processPayment = async (purchaseId, { cardNumber, cardName, expMonth, expYear, cvc }) => {
  console.log("Procesando pago para compra:", purchaseId);

  if (!cardNumber || !cardName || !expMonth || !expYear || !cvc) {
    throw new InvalidPurchaseError("Todos los datos de la tarjeta son obligatorios");
  }

  const purchase = await purchaseRepository.findPurchaseById(purchaseId);
  if (!purchase) {
    throw new PurchaseNotFoundError("Compra no encontrada");
  }

  if (purchase.status === "completado") {
    throw new PurchaseAlreadyProcessedError("El pago ya fue procesado para esta compra");
  }

  const paymentSuccessful = true; 

  if (paymentSuccessful) {
    const updatedPurchase = await purchaseRepository.updatePurchaseById(purchaseId, { status: "completado" });
    console.log("Pago procesado exitosamente:", updatedPurchase);
    return updatedPurchase;
  } else {
    throw new InvalidPurchaseError("El pago falló");
  }
};

/**
 
 * 
 * @param {string} id 
 * @returns {Promise<Object>} 
 */
export const deletePurchase = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidPurchaseError("ID de compra no válido");
  }

  const purchase = await purchaseRepository.findPurchaseById(id);
  if (!purchase) {
    throw new PurchaseNotFoundError();
  }

  return await purchaseRepository.deletePurchaseById(id);
};

/**
 * 
 * @param {string} id 
 * @param {Object} updates
 * @returns {Promise<Object>} 
 */
export const editPurchase = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidPurchaseError("ID de compra no válido");
  }

  const purchase = await purchaseRepository.findPurchaseById(id);
  if (!purchase) {
    throw new PurchaseNotFoundError();
  }

  return await purchaseRepository.updatePurchaseById(id, updates);
};

/**
 * 
 * @param {string} id 
 * @returns {Promise<Object>} 
 */
export const showPurchaseById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new PurchaseNotFoundError();
  }

  const purchase = await purchaseRepository.findPurchaseById(id);
  if (!purchase) {
    throw new PurchaseNotFoundError();
  }

  return purchase;
};

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Array>} 
 */
export const showPurchasesByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new InvalidPurchaseError("ID de usuario no válido");
  }

  const purchases = await purchaseRepository.findPurchasesByUser(userId);
  if (purchases.length === 0) {
    throw new PurchaseNotFoundError("No se encontraron compras para este usuario");
  }

  return purchases;
};

/**
 * 
 * @returns {Promise<Array>} 
 */
export const showAllPurchases = async () => {
  const purchases = await purchaseRepository.findAllPurchases();
  if (purchases.length === 0) {
    throw new PurchaseNotFoundError("No se encontraron compras");
  }
  return purchases;
};

/**
 * 
 * @param {string} status 
 * @param {string} userId 
 * @returns {Promise<Array>} 
 */
export const showPurchasesByStatus = async (status, userId) => {
  try {
    const purchases = await purchaseRepository.findPurchasesByUserAndStatus(userId, status);
    if (!purchases || purchases.length === 0) {
      throw new Error("No se encontraron compras con el estado especificado.");
    }
    return purchases;
  } catch (error) {
    throw new Error(`Error al obtener las compras: ${error.message}`);
  }
};
