import { body, param } from 'express-validator';

export const addFilterValidationRules = [
  body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
  body('budget').isNumeric().notEmpty().withMessage('El presupuesto es obligatorio').isInt({ max: 2000 }).withMessage('El presupuesto no debe exceder los $2000'),
  body('days').isNumeric().notEmpty().withMessage('Los días son obligatorios').isInt({ max: 30 }).withMessage('Los días no deben exceder los 30 días'),
  body('masInfo').isString().notEmpty().withMessage('La información adicional es obligatoria'),
  body('img').isString().notEmpty().withMessage('La imagen es obligatoria'),
  body('activities').isArray().optional(),
  body('food').isArray().optional(),
  body('interests').isArray().optional(),
];

export const editFilterValidationRules = [
  body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
  body('budget').isNumeric().notEmpty().withMessage('El presupuesto es obligatorio').isInt({ max: 2000 }).withMessage('El presupuesto no debe exceder los $2000'),
  body('days').isNumeric().notEmpty().withMessage('Los días son obligatorios').isInt({ max: 30 }).withMessage('Los días no deben exceder los 30 días'),
  body('masInfo').isString().notEmpty().withMessage('La información adicional es obligatoria'),
  body('img').isString().notEmpty().withMessage('La imagen es obligatoria'),
  body('activities').isArray().optional(),
  body('food').isArray().optional(),
  body('interests').isArray().optional(),
];

export const deleteFilterValidationRules = [
  param('id').isString().notEmpty().withMessage('ID del filtro es requerido'),
];
