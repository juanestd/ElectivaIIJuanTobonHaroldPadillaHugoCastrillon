const AuthenticateUserCommand = require('../../core/services/features/auth/commands/AuthenticateUserCommand/AuthenticateUserCommand');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */
class AuthController {
    constructor(authenticateUserHandler) {
        this.authenticateUserHandler = authenticateUserHandler;
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Iniciar sesión de un usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *       401:
     *         description: Credenciales inválidas
     */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const command = new AuthenticateUserCommand(username, password);
            const { userClient, token } = await this.authenticateUserHandler.handle(command);
            res.status(200).json({ message: 'Login successful', user: userClient, token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
