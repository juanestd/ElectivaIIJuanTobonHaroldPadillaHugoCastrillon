const users = require('../../../core/domain/mocks/AuthMocks');

const validateRegister = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: "error", message: "Username and password are required" });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: "error", message: "Username and password are required" });
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin
};
