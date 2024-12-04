export class UserAlreadyExistsError extends Error {
    constructor(message = 'EL usuario ya existe, intente con otro') {
      super(message);
      this.name = 'UserAlreadyExistsError';
    }
  }
  
  export class InvalidCredentialsError extends Error {
    constructor(message = 'Credenciales inválidas, intente de nuevo') {
      super(message);
      this.name = 'InvalidCredentialsError';
    }
  }

export class MissingFieldsToComplete extends Error {
  constructor(message = 'Faltan campos por rellenar'){
    super(message);
    this.name = 'MissingFieldsToComplete';
  }
}

export class userNotFoundError extends Error {
  constructor(message = 'El usuario no existe'){
      super(message);
      this.name = 'userNotFount';
    }
}

export class UserOperationError extends Error {
  constructor(message = 'Error al realizar la operación'){
      super(message);
      this.name = 'UserOperationError';
    }
}