import Purchase from "../models/purchase.model.js";
import mongoose from "mongoose";

/**
 * @returns {Promise<Purchase[]>}
 */
export const findAllPurchases = async () => {
  try {
    return await Purchase.find().populate("user").populate("items.offer");
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todas las compras");
  }
};

/**
 * @param {string} id
 * @returns {Promise<Purchase|null>}
 */
export const findPurchaseById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de compra no válido");
  }
  try {
    return await Purchase.findById(id).populate("offer");
  } catch (error) {
    console.error(error);
    throw new Error("Error al buscar la compra");
  }
};

/**
 * @param {string} userId
 * @returns {Promise<Purchase[]>}
 */
export const findPurchasesByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("ID de usuario no válido");
  }
  try {
    return await Purchase.find({ user: userId, status: "completado" })
      .populate("offer"); 
  } catch (error) {
    console.error("Error al buscar las compras del usuario:", error);
    throw new Error("Error al buscar las compras del usuario");
  }
};

/**
 * @param {string} userId
 * @param {string} status
 * @returns {Promise<Purchase[]>}
 */
export const findPurchasesByUserAndStatus = async (userId, status) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("ID de usuario no válido");
  }
  try {
    return await Purchase.find({ user: userId, status })
      .populate("offer");
  } catch (error) {
    console.error("Error al buscar las compras por usuario y estado:", error);
    throw new Error("Error al buscar las compras por usuario y estado");
  }
};

/**
 * @param {Object} purchaseData
 * @returns {Promise<Purchase>}
 */
export const createPurchase = async (purchaseData) => {
  try {
    console.log("Datos de compra recibidos en el repositorio:", purchaseData);
    const newPurchase = new Purchase(purchaseData);
    return await newPurchase.save();
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la compra");
  }
};

/**
 * @param {string} id
 * @param {Object} updatedData
 * @returns {Promise<Purchase|null>}
 */
export const updatePurchaseById = async (id, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de compra no válido");
  }
  try {
    return await Purchase.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar la compra");
  }
};

/**
 * @param {string} id
 * @returns {Promise<Purchase|null>}
 */
export const deletePurchaseById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de compra no válido");
  }
  try {
    return await Purchase.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la compra");
  }
};

/**
 * @param {string} purchaseId
 * @returns {Promise<Purchase|null>}
 */
export const updatePurchaseStatusToCompleted = async (purchaseId) => {
  if (!mongoose.Types.ObjectId.isValid(purchaseId)) {
    throw new Error("ID de compra no válido");
  }
  try {
    return await Purchase.findByIdAndUpdate(
      purchaseId,
      { status: "completado" },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el estado de la compra");
  }
};
