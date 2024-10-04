/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and authentication
 */
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *               - email
     *               - name
     *             properties:
     *               username:
     *                 type: string
     *                 description: The username of the new user
     *               password:
     *                 type: string
     *                 format: password
     *                 description: The password of the new user
     *               email:
     *                 type: string
     *                 description: The email of the new user
     *               name:
     *                 type: string
     *                 description: The name of the new user
     *     responses:
     *       201:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 user:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     username:
     *                       type: string
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async registerUser(req, res) {
        try {
            const { username, password, email, name } = req.body;
            const user = await this.userService.createUser({ username, password, email, name });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            if (error.message.includes('username') || error.message.includes('email')) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'An error occurred while registering the user' });
        }
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Log in a user
     *     tags: [User]
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
     *                 description: The username of the user
     *               password:
     *                 type: string
     *                 format: password
     *                 description: The password of the user
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 user:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     username:
     *                       type: string
     *                 token:
     *                   type: string
     *                   description: JWT token for authentication
     *       401:
     *         description: Invalid credentials
     *       500:
     *         description: Internal server error
     */
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token } = await this.userService.loginUser(username, password);
            res.status(200).json({ message: 'Login successful', user, token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /me:
     *   get:
     *     summary: Get authenticated user details
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Authenticated user details
     */
    async getAuthenticatedUser(req, res) {
        try {
            const user = req.user;
            res.status(200).json({ user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /logout:
     *   post:
     *     summary: Log out the user
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully logged out
     */
    async logoutUser(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(400).json({ message: 'Authorization header missing' });
            }
            const token = authHeader.split(' ')[1];
            const result = await this.userService.logoutUser(token);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
