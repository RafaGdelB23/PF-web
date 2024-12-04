import * as offerService from "../services/offer.service.js";
import Place from "../models/place.model.js";

export const addNewOffer = async (req, res) => {
  const {
    name,
    category,
    subcategory,
    duration,
    price,
    location,
    img,
    categoryImg,
    description,
    edadMinima,
    horario1,
    horario2,
    horario3,
    mainImg
  } = req.body;

  const userRole = req.user?.role; 

  try {
    const result = await offerService.addNewOffer(
      {
        name,
        category,
        subcategory,
        duration,
        price,
        location,
        img,
        categoryImg,
        description,
        edadMinima,
        horario1,
        horario2,
        horario3,
        mainImg,
      },
      userRole
    );
    res.status(201).json({ message: "Oferta agregada exitosamente", result });
  } catch (error) {
    res
      .status(error.name === "UnauthorizedOfferActionError" ? 403 : 500)
      .json({ message: "Error agregando la oferta", error: error.message });
  }
};

export const deleteOffer = async (req, res) => {
  const { id } = req.params;
  const userRole = req.user?.role; 

  try {
    const result = await offerService.deleteOldOffer(id, userRole);
    res.status(200).json({ message: "Oferta eliminada exitosamente", result });
  } catch (error) {
    res
      .status(error.name === "UnauthorizedOfferActionError" ? 403 : 500)
      .json({ message: "Error eliminando la oferta", error: error.message });
  }
};

export const editOffer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userRole = req.user?.role; 

  try {
    const result = await offerService.editOffer(id, updates, userRole);
    res.status(200).json({ message: "Oferta editada exitosamente", result });
  } catch (error) {
    res
      .status(error.name === "UnauthorizedOfferActionError" ? 403 : 500)
      .json({ message: "Error editando la oferta", error: error.message });
  }
};

export const showOffersByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const offers = await offerService.showOffersByCategory(category);
    res.status(200).json({ message: "Ofertas por categoría", offers });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error obteniendo las ofertas por categoría",
        error: error.message,
      });
  }
};

export const findOffersBySubcategory = async (req, res) => {
  const { subcategory } = req.params;

  try {
    const offersSubCat = await offerService.findOffersBySubcategory(subcategory);
    res.status(200).json({ message: "Ofertas encontradas", offersSubCat });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar ofertas", error: error.message });
  }
};

export const findOffersByCategoryAndSubcategory = async (req, res) => {
  console.log('Ruta recibida:', req.originalUrl);  // Verifica la URL completa que llega
  console.log('Category:', req.params.category);   // Muestra el valor de category
  console.log('Subcategory:', req.params.subcategory); 
  const { category, subcategory } = req.params;

  // Verifica si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const offers = await offerService.findOffersByCategoryAndSubcategory(category, subcategory);
    res.status(200).json({
      message: "Ofertas encontradas",
      offers
    });
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo ofertas por categoría y subcategoría",
      error: error.message
    });
  }
};



export const showOfferById = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await offerService.showOfferById(id);
    res.status(200).json({ message: "Oferta encontrada", offer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo la oferta", error: error.message });
  }
};
