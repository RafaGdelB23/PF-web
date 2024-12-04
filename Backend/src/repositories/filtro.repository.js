import Filtro from "../models/filtro.model.js";
import mongoose from "mongoose";

/**
 * @returns {Promise<Array<Filtro>>}
 */
export const findAllFiltros = async () => {
  try {
    return await Filtro.find();
  } catch (error) {
    throw new Error("Error al obtener los filtros: " + error.message);
  }
};

/**
 * @param {string} id
 * @returns {Promise<Filtro|null>}
 */
export const findFiltroById = async (id) => {
  try {
    return await Filtro.findById(id);
  } catch (error) {
    throw new Error("Error al obtener el filtro por ID: " + error.message);
  }
};

/**
 * @param {Object} filtroData
 * @returns {Promise<Filtro>}
 */
export const createFiltro = async ({
  name,
  budget,
  days,
  masInfo,
  img,
  activities = [],
  food = [],
  interests = [],
}) => {
  if (!name || !budget || !days || !masInfo || !img) {
    throw new Error("Campos obligatorios faltantes: name, budget, days, masInfo, img");
  }

  const filtro = new Filtro({
    name,
    budget,
    days,
    masInfo,
    img,
    activities,
    food,
    interests,
  });

  try {
    return await filtro.save();
  } catch (error) {
    throw new Error("Error al crear el filtro: " + error.message);
  }
};

/**
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Filtro|null>}
 */
export const updateFiltroById = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }

  try {
    return await Filtro.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Error al actualizar el filtro: " + error.message);
  }
};

/**
 * @param {string} id
 * @returns {Promise<Filtro|null>}
 */
export const deleteFiltroById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }

  try {
    return await Filtro.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error al eliminar el filtro: " + error.message);
  }
};

