const validateFollowingCreation = (req, res, next) => {
    const { following_username } = req.body;
    if (!following_username) {
        return res.status(400).json({ status: "error", message: "Following username is required" });
    }
    next();
};

const validateFollowingUpdate = (req, res, next) => {
    const { id_following, following_username } = req.body;
    if (!id_following || !following_username) {
        return res.status(400).json({ status: "error", message: "Following ID and following username are required" });
    }
    next();
};

module.exports = {
    validateFollowingCreation,
    validateFollowingUpdate
};
