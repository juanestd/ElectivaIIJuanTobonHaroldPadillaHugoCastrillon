const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require('../middlewares/AuthMiddleware');
const AuthControllers = require("../../../adapters/controllers/authController");
const AuthService = require("../../../core/services/AuthService");  // Importación de AuthService
const UserRepository = require("../../../adapters/repositories/UserRepository");  // Importación de UserRepository

// Inicia el controlador con el servicio necesario
const authService = new AuthService(new UserRepository());
const authController = new AuthControllers(authService);

router.post('/auth/register', validateRegister, (req, res) => authController.registerUser(req, res));
router.post('/auth/login', validateLogin, (req, res) => authController.loginUser(req, res));

module.exports = router;
