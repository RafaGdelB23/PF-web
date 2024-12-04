import { body } from 'express-validator';

export const userRegisterValidationRules = [
  body('email')
  .isEmail()
  .withMessage('Correo electrónico válido es requerido')
  .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe tener al menos una letra mayúscula')
    .matches(/\d/)
    .withMessage('La contraseña debe tener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/),

  body('phone')
    .matches(/^\d{4}-\d{4}$/)
    .withMessage('El número de teléfono debe estar en el formato XXXX-XXXX'),

  body('firstName')
    .isString()
    .notEmpty()
    .withMessage('El nombre es requerido'),

  body('lastName')
    .isString()
    .notEmpty()
    .withMessage('El apellido es requerido'),
];

export const userLoginValidationRules = [
  body('email')
  .isEmail()
  .withMessage('Correo electrónico válido es requerido'),

  body('password')
  .notEmpty()
  .withMessage('Contraseña es requerida'),
];

export const changePasswordValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido.')
    .normalizeEmail(),

  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('La nueva contraseña debe tener al menos 8 caracteres.'),
    
  body('confirmNewPassword')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Las contraseñas no coinciden.')
];
