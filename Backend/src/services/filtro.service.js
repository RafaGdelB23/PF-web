import {
  findFiltroById,
  createFiltro,
  updateFiltroById,
  deleteFiltroById,
  findAllFiltros,
} from "../repositories/filtro.repository.js";
import {
  FilterAlreadyExistsError,
  FilterNotFoundError,
  FiltroDeleteError,
  FiltersNotAvailable,
} from "../errors/errors.filtro.js";

/**
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getFiltroById = async (id) => {
  const filtro = await findFiltroById(id);
  if (!filtro) {
    throw new FilterNotFoundError();
  }
  return filtro;
};

/**
 * @param {Object} filtroData
 * @returns {Promise<Object>}
 */
export const createNewFiltro = async (filtroData) => {
  const existingFiltro = await findFiltroById(filtroData.id);
  if (existingFiltro) {
    throw new FilterAlreadyExistsError();
  }
  const newFiltro = await createFiltro(filtroData);
  return newFiltro;
};

/**
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export const updateExistingFiltro = async (id, updates) => {
  const updatedFiltro = await updateFiltroById(id, updates);
  if (!updatedFiltro) {
    throw new FilterNotFoundError();
  }
  return updatedFiltro;
};

/**
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteFiltro = async (id) => {
  const deletedFiltro = await deleteFiltroById(id);
  if (!deletedFiltro) {
    throw new FiltroDeleteError();
  }
  return deletedFiltro;
};

/**
 * @returns {Promise<Array<Object>>}
 */
export const getAllFiltros = async () => {
  const filtros = await findAllFiltros();
  if (!filtros || filtros.length === 0) {
    throw new FiltersNotAvailable();
  }
  return filtros;
};

export const searchOffers = async ({
  presupuesto,
  dias,
  comida,
  actividades,
  intereses,
}) => {
  try {
    const query = {};

    if (presupuesto) {
      query.budget = { $lte: parseFloat(presupuesto) };
    }
    if (dias) {
      query.days = { $lte: parseInt(dias, 10) };
    }
    if (comida && comida.length > 0) {
      query.food = { $in: comida };
    }
    if (actividades && actividades.length > 0) {
      query.activities = { $in: actividades };
    }
    if (intereses && intereses.length > 0) {
      query.interests = { $in: intereses };
    }

    const ofertas = await findAllFiltros(query);

    return ofertas;
  } catch (error) {
    console.error("Error al buscar las ofertas filtradas: ", error);
    throw new Error("Error al obtener las ofertas filtradas");
  }
};

