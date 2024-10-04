const bcrypt = require('bcrypt');
const IAuthService = require('../../core/services/contracts/IAuthService');
const jwt = require('jsonwebtoken');

class JwtAuthService extends IAuthService {
    constructor(secretKey, expiresIn, userRepository) {
        super();
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
        this.userRepository = userRepository;
    }

    async authenticate(credentials) {
        const { username, password } = credentials;

        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new Error('Authentication failed: User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Authentication failed: Incorrect password.');
        }

        const token = await this.generateToken(user);
        return { user, token };
    }

    async generateToken(user) {
        return jwt.sign({ id: user.id, username: user.username }, this.secretKey, {
            expiresIn: this.expiresIn,
        });
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = JwtAuthService;
