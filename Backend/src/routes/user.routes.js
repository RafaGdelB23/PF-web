import express from "express";
import {
  registerController,
  loginController,
  changePasswordController,
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController,
  deleteUserController,
  updateUserController,
  updateUserProfileController,
  showUserByIdController
} from "../controllers/user.controller.js";
import {
  changePasswordValidationRules,
  userLoginValidationRules,
  userRegisterValidationRules,
} from "../validators/user.validator.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", userRegisterValidationRules, validate, registerController);
router.post("/login", userLoginValidationRules, validate, loginController);
router.put("/changePass", changePasswordValidationRules, validate, changePasswordController);

router.post("/favorites/:userId", authMiddleware, addFavoriteController);
router.delete("/favorites/:userId", authMiddleware, removeFavoriteController);
router.get("/favorites/:userId", authMiddleware, getFavoritesController);

router.delete("/deleteUser/:id", authMiddleware, deleteUserController);
router.put("/editUser/:id?", authMiddleware, updateUserController);
router.put("/:id", authMiddleware, updateUserProfileController);
router.get("/Administrador/:id", showUserByIdController);

router.delete("/deleteUser/Administrador/:id", authMiddleware, deleteUserController);
router.put("/editUser/Administrador/:id?", authMiddleware, updateUserController);

export default router;
