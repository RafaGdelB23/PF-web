export class PurchaseNotFoundError extends Error {
  constructor(message = "Compra no encontrada") {
    super(message);
    this.name = "PurchaseNotFoundError";
  }
}

export class InvalidPurchaseError extends Error {
  constructor(message = "Datos de compra inválidos") {
    super(message);
    this.name = "InvalidPurchaseError";
  }
}

export class PurchaseAlreadyProcessedError extends Error {
  constructor(message = "El pago ya fue procesado para esta compra") {
    super(message);
    this.name = "PurchaseAlreadyProcessedError";
  }
}
