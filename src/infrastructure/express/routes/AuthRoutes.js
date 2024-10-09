const express = require("express");
const { validateLogin } = require('../middlewares/UserMiddleware');
const AuthController = require("../../../adapters/controllers/AuthController");

const AuthenticateUserHandler = require("../../../core/services/features/auth/commands/AuthenticateUserCommand/AuthenticateUserHandler");

module.exports = ({ authService }) => {
    const router = express.Router();

    const authenticateUserHandler = new AuthenticateUserHandler(authService);

    const authController = new AuthController(authenticateUserHandler);

    router.post('/auth/login', validateLogin, (req, res) => authController.login(req, res));

    return router;
};
