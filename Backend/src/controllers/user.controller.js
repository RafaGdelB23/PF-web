import * as userService from '../services/user.service.js';
import { UserAlreadyExistsError, InvalidCredentialsError, MissingFieldsToComplete } from '../errors/errors.user.js';

export const registerController = async (req, res) => {

  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', result });
  } catch (error) {
    if (error.code === 11000) { 
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        message: `El campo ${field} con valor '${value}' ya está en uso.`,
      });
    }

    if (error instanceof UserAlreadyExistsError) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error registrando el usuario', error: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginData = await userService.loginUser({ email, password });
    res.json(loginData);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error en el inicio de sesión del usuario', error: error.message });
  }
};

export const changePasswordController = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  try {
    if (!email || !newPassword || !confirmNewPassword) {
      throw new MissingFieldsToComplete();
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    await userService.changePassword({ email, newPassword, confirmNewPassword });

    return res.status(200).json({ message: "Contraseña cambiada exitosamente." });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (error instanceof MissingFieldsToComplete) {
      return res.status(400).json({ message: "Faltan campos obligatorios: email, newPassword, confirmNewPassword." });
    }

    res.status(500).json({ message: "Error en el cambio de contraseña.", error: error.message });
  }
};


export const addFavoriteController = async (req, res) => {
  const { userId } = req.params;
  const { offerId } = req.body;

  try {
    const updatedUser = await userService.addFavorite(userId, offerId);
    res.status(200).json({ message: 'Oferta agregada a favoritos', favorites: updatedUser.favorites });
  } catch (error) {
    if (error.message === "La oferta ya está en favoritos") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al agregar a favoritos', error: error.message });
  }
};

export const removeFavoriteController = async (req, res) => {
  const { userId } = req.params;
  const { offerId } = req.body;

  try {
    const updatedUser = await userService.removeFavorite(userId, offerId);
    res.status(200).json({ message: 'Oferta eliminada de favoritos', favorites: updatedUser.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de favoritos', error: error.message });
  }
};

export const getFavoritesController = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await userService.getFavorites(userId);
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los favoritos', error: error.message });
  }
};

/**
 * Elimina un usuario (solo permitido para administradores)
 * @param {Object} req
 * @param {Object} res
 */
export const deleteUserController = async (req, res) => {
  const { id: userId } = req.params;
  const { role: userRole } = req.user; 

  try {
    await userService.deleteUser(userId, userRole);
    
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    if (error.message === "Acceso denegado, solo los administradores pueden eliminar usuarios") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */

export const updateUserController = async (req, res) => {
  const userId = req.params.id || null; 
  const { role: requesterRole, id: requesterId } = req.user;
  const newData = req.body; 

  try {
    const updatedUser = await userService.updateUser(userId, newData, requesterId, requesterRole);

    res.status(200).json({ message: 'Usuario actualizado exitosamente', data: updatedUser });
  } catch (error) {
    if (error.message === "Acceso denegado, solo los administradores pueden editar otros usuarios") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Acceso denegado, los administradores solo pueden editar usuarios con rol client") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Update User para cliente

export const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone, email },
      { new: true }
    );

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const showUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.showUserById(id);
    res.status(200).json({ message: "Usuario encontrado", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo el usuario", error: error.message });
  }
};
