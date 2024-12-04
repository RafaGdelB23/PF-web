import * as offerRepository from "../repositories/offer.repository.js";
import {
  OfferAlreadyExistsError,
  OfferNotFoundError,
  OfferDeleteError,
  UnauthorizedOfferActionError,
  OfferOperationError,
  OffersNotAvailable,
} from "../errors/errors.offers.js";

export const addNewOffer = async (offerData, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedOfferActionError("Solo los administradores pueden agregar ofertas.");
  }

  const { name } = offerData;

  try {
    const offerExists = await offerRepository.findOfferByName(name);
    if (offerExists) {
      throw new OfferAlreadyExistsError();
    }
    const newOffer = await offerRepository.createOffer(offerData);
    return newOffer;
  } catch (error) {
    throw new OfferOperationError("Error al agregar la oferta.", error.message);
  }
};

export const editOffer = async (offerId, updatedOfferData, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedOfferActionError("Solo los administradores pueden editar ofertas.");
  }

  try {
    const offer = await offerRepository.findOfferById(offerId);
    if (!offer) {
      throw new OfferNotFoundError("Oferta no encontrada.");
    }

    const updatedOffer = await offerRepository.updateOffer(offerId, updatedOfferData);
    return updatedOffer;
  } catch (error) {
    throw new OfferOperationError("Error al editar la oferta.", error.message);
  }
};

export const deleteOldOffer = async (offerId, userRole) => {
  if (userRole !== "admin") {
    throw new UnauthorizedOfferActionError("Solo los administradores pueden eliminar ofertas.");
  }

  try {
    const offer = await offerRepository.findOfferById(offerId);
    if (!offer) {
      throw new OfferNotFoundError("Oferta no encontrada.");
    }

    const deletedOffer = await offerRepository.deleteOfferById(offerId);
    return deletedOffer;
  } catch (error) {
    throw new OfferDeleteError("Error al eliminar la oferta.", error.message);
  }
};

export const showOfferById = async (offerId) => {
  if (!offerId) {
    throw new OfferNotFoundError("El ID de la oferta es inválido.");
  }

  try {
    const offer = await offerRepository.findOfferById(offerId);
    if (!offer) {
      throw new OfferNotFoundError("Oferta no encontrada.");
    }

    return offer;
  } catch (error) {
    throw new OfferOperationError("Error al obtener la oferta.", error.message);
  }
};

export const showOffersByCategory = async (category) => {
  try {
    const offers = await offerRepository.findOffersByCategory(category);
    if (!offers || offers.length === 0) {
      throw new OffersNotAvailable("No se encontraron ofertas para esta categoría.");
    }
    return offers;
  } catch (error) {
    throw new OfferOperationError("Error al obtener las ofertas por categoría.", error.message);
  }
};

export const findOffersByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;

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


export const findOffersBySubcategory = async (subcategory) => {
  try {
    const offersSubCategory = await offerRepository.findOffersBySubcategory(subcategory);
    if (!offersSubCategory || offersSubCategory.length === 0) {
      throw new OffersNotAvailable("No se encontraron ofertas para esta subcategoría.");
    }
    return offersSubCategory;
  } catch (error) {
    throw new OfferOperationError("Error al obtener ofertas por subcategoría.", error.message);
}
};
