const express = require("express");
const { validateRegister } = require('../middlewares/UserMiddleware');
const UserController = require("../../../adapters/controllers/UserController");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const CreateUserHandler = require('../../../core/services/features/user/CreateUserCommand/CreateUserCommand');

module.exports = () => {
    const router = express.Router();

    const userRepository = new UserRepository();

    const createUserHandler = new CreateUserHandler(userRepository);

    const userController = new UserController(
        createUserHandler
    );

    router.post('/auth/register', validateRegister, (req, res) => userController.registerUser(req, res));

    return router;
};
