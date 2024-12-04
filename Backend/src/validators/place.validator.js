import { body, param } from 'express-validator';

export const addPlaceValidationRules = () => {
  return [
    body('namePlace')
      .isString()
      .notEmpty()
      .withMessage('El nombre del lugar es requerido'),

    body('mainImg')
      .isString()
      .notEmpty()
      .withMessage('La imagen principal es requerida'),

    body('subImg1')
      .isString()
      .notEmpty()
      .withMessage('La primera imagen secundaria es requerida'),

    body('subImg2')
      .isString()
      .notEmpty()
      .withMessage('La segunda imagen secundaria es requerida'),

    body('aboutPlace')
      .isString()
      .notEmpty()
      .withMessage('La descripción del lugar es requerida'),

    body('placeAdvices')
      .isString()
      .notEmpty()
      .withMessage('Los consejos del lugar son requeridos'),

    body('map')
      .isString()
      .notEmpty()
      .withMessage('El mapa es requerido'),

    body('location')
      .isString()
      .notEmpty()
      .withMessage('La ubicación del lugar es requerida'),

    body('category')
      .isString()
      .notEmpty()
      .withMessage('La categoría del lugar es requerida')
      .isIn(['Volcán', 'Playa', 'LagosLagunas', 'SitiosArqueologicos', 'Parque'])
      .withMessage('Categoría no válida, no pertenece a las categorías permitidas'),

    body('package')
      .optional()
      .isString()
      .withMessage('El paquete debe ser una cadena de texto si se proporciona'),
  ];
};

export const editPlaceValidationRules = () => {
  return [
    body('namePlace')
      .isString()
      .notEmpty()
      .withMessage('El nombre del lugar es requerido'),

    body('mainImg')
      .isString()
      .notEmpty()
      .withMessage('La imagen principal es requerida'),

    body('subImg1')
      .isString()
      .notEmpty()
      .withMessage('La primera imagen secundaria es requerida'),

    body('subImg2')
      .isString()
      .notEmpty()
      .withMessage('La segunda imagen secundaria es requerida'),

    body('aboutPlace')
      .isString()
      .notEmpty()
      .withMessage('La descripción del lugar es requerida'),

    body('placeAdvices')
      .isString()
      .notEmpty()
      .withMessage('Los consejos del lugar son requeridos'),

    body('map')
      .isString()
      .notEmpty()
      .withMessage('El mapa es requerido'),

    body('location')
      .isString()
      .notEmpty()
      .withMessage('La ubicación del lugar es requerida'),

    body('category')
      .isString()
      .notEmpty()
      .withMessage('La categoría del lugar es requerida, no pertenece a las categorías permitidas')
      .isIn(['Volcán', 'Playa', 'LagosLagunas', 'SitiosArqueologicos', 'Parque'])
      .withMessage('Categoría no válida'),

    body('package')
      .optional()
      .isString()
      .withMessage('El paquete debe ser una cadena de texto'),
  ];
};

export const deletePlaceValidationRules = () => {
  return [
    param('id')
      .isString()
      .notEmpty()
      .withMessage('ID del lugar es requerido')
      .isMongoId()
      .withMessage('ID del lugar no es válido'),
  ];
};
