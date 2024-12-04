import { body, param } from 'express-validator';

export const addOfferValidationRules = () => {
  return [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('El nombre de la oferta es requerido'),

    body('category')
      .isString()
      .notEmpty()
      .withMessage('La categoría de la oferta es requerida')
      .isIn(['Package', 'Activity'])
      .withMessage('Categoría no válida, debe ser "Package" o "Activity"'),

    body('subcategory')
      .isString()
      .notEmpty()
      .withMessage('La subcategoría de la oferta es requerida')
      .isIn(['Volcanes', 'Playas', 'Sitios Arqueologicos', 'Parques', 'Lagos y Lagunas'])
      .withMessage('Subcategoría no válida'),

    body('duration')
      .isString()
      .notEmpty()
      .withMessage('La duración de la oferta es requerida'),

      body('price')
      .custom((value) => {
        const regex = /^\$\d+(\.\d{2})?$/; 
        if (!regex.test(value)) {
          throw new Error('El precio debe tener el formato "$55.00"');
        }
        return true;
      })
      .notEmpty()
      .withMessage('El precio de la oferta es requerido'),
    

    body('location')
      .isString()
      .notEmpty()
      .withMessage('La ubicación de la oferta es requerida'),

    body('schedule')
      .optional()
      .isArray()
      .withMessage('El horario debe ser un array de cadenas de texto'),
  ];
};

export const editOfferValidationRules = () => {
  return [
    body('name')
      .optional()
      .isString()
      .withMessage('El nombre de la oferta debe ser un texto válido'),

    body('category')
      .optional()
      .isString()
      .withMessage('La categoría de la oferta debe ser un texto válido')
      .isIn(['Package', 'Activity'])
      .withMessage('Categoría no válida, debe ser "Package" o "Activity"'),

    body('subcategory')
      .optional()
      .isString()
      .withMessage('La subcategoría de la oferta debe ser un texto válido')
      .isIn(['Volcanes', 'Playas', 'Sitios Arqueologicos', 'Parques', 'Lagos y Lagunas'])
      .withMessage('Subcategoría no válida'),

    body('duration')
      .optional()
      .isString()
      .withMessage('La duración de la oferta debe ser un texto válido'),

    body('price')
      .optional()
      .custom((value) => {
        const regex = /^\$\d+(\.\d{2})?$/; 
        if (!regex.test(value)) {
          throw new Error('El precio debe tener el formato "$55.00"');
        }
        return true;
      })
      .withMessage('El precio de la oferta debe ser un texto con formato "$XX.XX"'),

    body('location')
      .optional()
      .isString()
      .withMessage('La ubicación de la oferta debe ser un texto válido'),

    body('img')
      .optional()
      .isString()
      .withMessage('La imagen de la oferta debe ser una URL válida'),

    body('mainImg')
      .optional()
      .isString()
      .withMessage('La imagen principal de la oferta debe ser una URL válida'),

    body('description')
      .optional()
      .isString()
      .withMessage('La descripción de la oferta debe ser un texto válido'),

    body('horario1')
      .optional()
      .isString()
      .withMessage('El horario 1 debe ser un texto válido'),

    body('horario2')
      .optional()
      .isString()
      .withMessage('El horario 2 debe ser un texto válido'),

    body('horario3')
      .optional()
      .isString()
      .withMessage('El horario 3 debe ser un texto válido'),
  ];
};

export const deleteOfferValidationRules = () => {
  return [
    param('id')
      .isString()
      .notEmpty()
      .withMessage('El ID de la oferta es requerido')
      .isMongoId()
      .withMessage('El ID de la oferta no es un ID válido de MongoDB'),
  ];
};

export const findOffersByCategoryAndSubcategoryValidationRules = () => {
  return [
    param('category')
      .isString()
      .notEmpty()
      .withMessage('La categoría es obligatoria')
      .isIn(['Package', 'Activity'])
      .withMessage('Categoría no válida, debe ser "Package" o "Activity"'),

    param('subcategory')
      .isString()
      .notEmpty()
      .withMessage('La subcategoría es obligatoria')
      .isIn(['Volcanes', 'Playas', 'Sitios Arqueologicos', 'Parques', 'Lagos y Lagunas'])
      .withMessage('Subcategoría no válida, debe ser uno de los valores definidos'),
  ];
};