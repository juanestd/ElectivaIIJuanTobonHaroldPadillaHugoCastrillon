const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require('../middlewares/UserMiddleware');
const UserController = require("../../../adapters/controllers/UserController");
const UserService = require("../../../core/services/features/user/UserService");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const JwtAuthService = require("../../../infrastructure/services/JwtAuthService");
const TokenBlacklist = require("../../../infrastructure/utils/TokenBlacklist");
const { authMiddleware } = require('../middlewares/AuthMiddleware');

const userRepository = new UserRepository();
const authService = new JwtAuthService('your-secret-key', '1h', userRepository);
const tokenBlacklist = new TokenBlacklist();
const userService = new UserService(userRepository, authService, tokenBlacklist);
const userController = new UserController(userService);

router.post('/auth/register', validateRegister, (req, res) => userController.registerUser(req, res));
router.post('/auth/login', validateLogin, (req, res) => userController.loginUser(req, res));
router.get('/me', authMiddleware(authService, tokenBlacklist), (req, res) => userController.getAuthenticatedUser(req, res));
router.post('/logout', authMiddleware(authService, tokenBlacklist), (req, res) => userController.logoutUser(req, res));

module.exports = router;
