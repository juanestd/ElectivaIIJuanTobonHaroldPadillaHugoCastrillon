const validatePostCreation = (req, res, next) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ status: "error", message: "Message is required" });
    }
    next();
};

const validatePostUpdate = (req, res, next) => {
    const { id_post, message } = req.body;
    if (!id_post || !message) {
        return res.status(400).json({ status: "error", message: "Post ID and message are required" });
    }
    next();
};

module.exports = {
    validatePostCreation,
    validatePostUpdate
};
