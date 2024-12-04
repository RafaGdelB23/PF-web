import * as userRepository from "../repositories/user.repository.js";
import { UserAlreadyExistsError, InvalidCredentialsError, UserOperationError } from "../errors/errors.user.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";

/**
 * @param {Object} userData
 * @returns {Promise<User>}
 */
export const registerUser = async ({ email, password, phone, firstName, lastName, role }) => {
  
  const userExists = await userRepository.findUserByEmail(email);
  if (userExists) {
    throw new UserAlreadyExistsError();
  }

  const newUser = await userRepository.createUser({
    email,
    password,
    phone,
    firstName,
    lastName,
    role,
  });

  return newUser;
};

/**
 * @param {Object} loginData
 * @returns {Promise<Object>}
 */
export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign(
    { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role, phone: user.phone, email: user.email},
    config.jwtSecret,
    { expiresIn: "1h" }
  );

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

/**
 * @param {Object} changePasswordData
 * @returns {Promise<void>}
 */
export const changePassword = async ({ email, newPassword, confirmNewPassword }) => {
  if (newPassword !== confirmNewPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    console.log("Usuario no encontrado.");
    throw new InvalidCredentialsError();
  }

  await userRepository.updatePassword(user._id, newPassword);

  console.log("Contraseña actualizada exitosamente para el usuario:", email);
};

/**
 * @param {string} userId
 * @param {string} offerId
 * @returns {Promise<User>}
 */
export const addFavorite = async (userId, offerId) => {
  return await userRepository.addToFavorites(userId, offerId);
};

/**
 * @param {string} userId
 * @param {string} offerId
 * @returns {Promise<User>}
 */
export const removeFavorite = async (userId, offerId) => {
  return await userRepository.removeFromFavorites(userId, offerId);
};

/**
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export const getFavorites = async (userId) => {
  const favorites = await userRepository.getUserFavorites(userId);
  return favorites;
};

/**
 * Elimina un usuario (solo permitido para administradores)
 * @param {string} userId 
 * @param {string} userRole 
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId, userRole) => {
  if (userRole !== 'admin') {
    throw new Error("Acceso denegado, solo los administradores pueden eliminar usuarios");
  }

  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await userRepository.deleteUserById(userId);
};

/**
 * @param {string|null} userId 
 * @param {object} newData 
 * @param {string} requesterId 
 * @param {string} requesterRole 
 * @returns {Promise<object>}
 */
export const updateUser = async (userId, newData, requesterId, requesterRole) => {
  const targetUserId = userId || requesterId;

  if (requesterRole !== 'admin' && targetUserId !== requesterId) {
    throw new Error("Acceso denegado, solo los administradores pueden editar otros usuarios");
  }

  const user = await userRepository.findUserById(targetUserId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (newData.email && newData.email !== user.email) {
    const existingUser = await userRepository.findUserByEmail(newData.email);
    if (existingUser && existingUser._id.toString() !== targetUserId) {
      throw new Error(`El email ${newData.email} ya está en uso por otro usuario`);
    }
  }
  
  const updatedUser = await userRepository.updateUserById(targetUserId, newData);
  return updatedUser;
};

/**
 * @param {string} userId
 * @param {Object} updateData 
 * @returns {Promise<user>} 
 */


export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone, email, newPassword } = req.body;

    const updatedUser = await updateUserProfile(userId, {
      firstName,
      lastName,
      phone,
      email,
      newPassword,
    });

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    if (error.message === "Usuario no encontrado.") {
      return res.status(404).json({ message: error.message });
    } else if (error.message.includes("El correo electrónico")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const showUserById = async (userId) => {

  try {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new userNotFoundError("Usuario no encontrado.");
    }

    return user;
  } catch (error) {
    throw new UserOperationError("Error al obtener el usuario.", error.message);
  }
};