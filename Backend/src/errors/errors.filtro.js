export class FilterAlreadyExistsError extends Error {
    constructor(message = 'El filtro ya existe, intente con otro') {
      super(message);
      this.name = 'FilterAlreadyExistsError';
    }
  }
  
  export class FilterNotFoundError extends Error {
    constructor(message = 'Filtro no encontrado') {
      super(message);
      this.name = 'FilterNotFoundError';
    }
  }
  
  export class FiltroDeleteError extends Error {
    constructor(message = 'Error al eliminar la opción de los filtros') {
      super(message);
      this.name = 'FiltroSchemaDeleteError';
    }
  }
  
  export class FiltersNotAvailable extends Error {
    constructor(message = 'No hay filtros disponibles') {
      super(message);
      this.name = 'FiltersNotAvailable';
    }
  }
  