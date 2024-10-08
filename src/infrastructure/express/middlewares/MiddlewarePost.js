const posts = require('../../../core/domain/mocks/PostMocks');

const validatePostCreation = (req, res, next) => {
    const { username } = req.params;
    const { message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ status: "error", message: "Username and message are required" });
    }

    next();
};

const validatePostUpdate = (req, res, next) => {
    const { id, message } = req.body;

    if (!id || !message) {
        return res.status(400).json({ status: "error", message: "Post ID and message are required" });
    }

    next();
};

module.exports = {
    validatePostCreation,
    validatePostUpdate
};
