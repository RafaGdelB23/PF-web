import * as purchaseService from "../services/purchase.service.js";

export const initiatePurchase = async (req, res) => {
  const user = req.user;
  const { offer, quantity, date, time } = req.body;

  try {
    const purchase = await purchaseService.initiatePurchase({
      user: user.id,
      offer,
      quantity,
      date,
      time,
    });

    res.status(201).json({ message: "Compra inicializada", purchaseId: purchase.id });
  } catch (error) {
    console.error("Error al iniciar la compra:", error);
    res.status(500).json({ message: "Error al iniciar la compra", error: error.message });
  }
};

export const addDuiToPurchase = async (req, res) => {
  const { purchaseId } = req.params;
  const { dui } = req.body;

  try {
    const updatedPurchase = await purchaseService.addDuiToPurchase(purchaseId, dui);

    res.status(200).json({ message: "DUI agregado a la compra", purchase: updatedPurchase });
  } catch (error) {
    console.error("Error al agregar el DUI:", error);
    res.status(500).json({ message: "Error al agregar el DUI", error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  const { purchaseId } = req.params;
  const { cardNumber, cardName, expMonth, expYear, cvc } = req.body;

  try {
    const updatedPurchase = await purchaseService.processPayment(purchaseId, {
      cardNumber,
      cardName,
      expMonth,
      expYear,
      cvc,
    });

    res.status(200).json({ message: "Pago procesado exitosamente", purchase: updatedPurchase });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ message: "Error al procesar el pago", error: error.message });
  }
};

export const deletePurchase = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await purchaseService.deletePurchase(id);

    res.status(200).json({ message: "Compra eliminada exitosamente", result });
  } catch (error) {
    console.error("Error al eliminar la compra:", error);
    res.status(500).json({ message: "Error al eliminar la compra", error: error.message });
  }
};

export const editPurchase = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPurchase = await purchaseService.editPurchase(id, updates);

    res.status(200).json({ message: "Compra actualizada exitosamente", purchase: updatedPurchase });
  } catch (error) {
    console.error("Error al actualizar la compra:", error);
    res.status(500).json({ message: "Error al actualizar la compra", error: error.message });
  }
};

export const showPurchaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const purchase = await purchaseService.showPurchaseById(id);

    res.status(200).json({ message: "Compra encontrada", purchase });
  } catch (error) {
    console.error("Error al obtener la compra:", error);
    res.status(500).json({ message: "Error al obtener la compra", error: error.message });
  }
};

export const showPurchasesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const purchases = await purchaseService.showPurchasesByUser(userId);

    res.status(200).json({ message: "Compras del usuario obtenidas", purchases });
  } catch (error) {
    console.error("Error al obtener las compras del usuario:", error);
    res.status(500).json({ message: "Error al obtener las compras del usuario", error: error.message });
  }
};

export const showAllPurchases = async (req, res) => {
  try {
    const purchases = await purchaseService.showAllPurchases();

    res.status(200).json({ message: "Todas las compras obtenidas", purchases });
  } catch (error) {
    console.error("Error al obtener todas las compras:", error);
    res.status(500).json({ message: "Error al obtener todas las compras", error: error.message });
  }
};

export const getCompletedPurchases = async (req, res) => {
  const userId = req.user.id;  
  
  try {
    const purchases = await purchaseService.showPurchasesByStatus("completado", userId);

    if (purchases.length === 0) {
      return res.status(404).json({ message: "No se encontraron compras completadas para este usuario." });
    }

    return res.status(200).json({ message: "Compras completadas obtenidas", purchases });
  } catch (error) {
    console.error("Error al obtener las compras completadas:", error);
    return res.status(500).json({ message: "Error al obtener las compras completadas", error: error.message });
  }
};