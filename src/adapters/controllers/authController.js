class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async registerUser(req, res) {
        const { username, password } = req.body;
        const user = await this.authService.registerUser({ username, password });
        res.status(201).json({ message: 'User registered successfully', user });
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        const user = await this.authService.loginUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

module.exports = AuthController;
