const jwtAuthService = require('../../services/JwtAuthService');
const tokenBlacklist = new Set();

const authMiddleware = (authService, tokenBlacklist) => async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token has been revoked' });
    }

    try {
        const user = await authService.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware, tokenBlacklist };
