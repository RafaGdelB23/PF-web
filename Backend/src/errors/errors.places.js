export class PlaceNotFoundError extends Error {
    constructor(message = "El lugar solicitado no fue encontrado.") {
      super(message);
      this.name = "PlaceNotFoundError";
      this.statusCode = 404; 
    }
  }
  
  export class UnauthorizedPlaceActionError extends Error {
    constructor(message = "No tienes permiso para realizar esta acción en los lugares.") {
      super(message);
      this.name = "UnauthorizedPlaceActionError";
      this.statusCode = 403;
    }
  }
  
  export class InvalidPlaceDataError extends Error {
    constructor(message = "Los datos proporcionados para el lugar son inválidos.") {
      super(message);
      this.name = "InvalidPlaceDataError";
      this.statusCode = 400; 
    }
  }
  
  export class PlaceOperationError extends Error {
    constructor(message = "Ocurrió un error durante la operación relacionada con lugares.") {
      super(message);
      this.name = "PlaceOperationError";
      this.statusCode = 500; 
    }
  }
  