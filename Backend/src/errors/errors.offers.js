export class UnauthorizedOfferActionError extends Error {
  constructor(message = "Acción no autorizada.") {
    super(message);
    this.name = "UnauthorizedOfferActionError";
  }
}

export class OfferAlreadyExistsError extends Error {
  constructor(message = "La oferta ya existe.") {
    super(message);
    this.name = "OfferAlreadyExistsError";
  }
}

export class OfferNotFoundError extends Error {
  constructor(message = "Oferta no encontrada.") {
    super(message);
    this.name = "OfferNotFoundError";
  }
}

export class OfferDeleteError extends Error {
  constructor(message = "Error al eliminar la oferta.") {
    super(message);
    this.name = "OfferDeleteError";
  }
}

export class OffersNotAvailable extends Error {
  constructor(message = "No se encontraron ofertas disponibles.") {
    super(message);
    this.name = "OffersNotAvailable";
  }
}

export class OfferOperationError extends Error {
  constructor(message = "Error en la operación con la oferta.", details) {
    super(`${message}${details ? ` ${details}` : ""}`);
    this.name = "OfferOperationError";
  }
}