import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * @param {string} email
 * @returns {Promise<User|null>}
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * @param {string} id
 * @returns {Promise<User|null>}
 */
export const findUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de oferta no válido");
  }
  console.log("ID recibido en findUserById:", id);

  return await User.findById(id);
};

/**
 * @param {Object} userData
 * @returns {Promise<User>}
 */
export const createUser = async ({ password, email, phone, firstName, lastName, role }) => {
  const user = new User({ password, email, phone, firstName, lastName, role });
  return await user.save();
};

/**
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<User|null>}
 */
export const updateUserById = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

/**
 * @param {string} id
 * @returns {Promise<User|null>}
 */
export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * @param {string} id
 * @param {string} newPassword
 * @returns {Promise<User|null>}
 */
export const updatePassword = async (id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true, runValidators: true });
};

/**
 * @param {string} userId
 * @param {string} offerId
 * @returns {Promise<User|null>}
 */
export const addToFavorites = async (userId, offerId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  if (!user.favorites.includes(offerId)) {
    user.favorites.push(offerId);
    await user.save();
  } else {
    throw new Error("La oferta ya está en favoritos");
  }
  return user;
};

/**
 * @param {string} userId
 * @param {string} offerId
 * @returns {Promise<User|null>}
 */
export const removeFromFavorites = async (userId, offerId) => {
  const result = await Favorite.deleteOne({ userId, offerId });
  if (result.deletedCount === 0) throw new Error("Favorito no encontrado");
  
  return { message: "Favorito eliminado exitosamente." };
}
/**
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export const getUserFavorites = async (userId) => {
  const user = await User.findById(userId).populate("favorites");
  if (!user) throw new Error("Usuario no encontrado");

  return user.favorites;
};

/**
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<User|null>}
 */
export const updateUserProfile = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};