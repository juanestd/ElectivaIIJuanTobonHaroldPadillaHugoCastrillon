const followings = require('../../../core/domain/mocks/FollowingMocks');

const validateFollowingCreation = (req, res, next) => {
    const { username } = req.params;
    const { following_username } = req.body;

    if (!username || !following_username) {
        return res.status(400).json({ status: "error", message: "Username and following_username are required" });
    }

    next();
};

const validateFollowingUpdate = (req, res, next) => {
    const { id_following, following_username } = req.body;

    if (!id_following || !following_username) {
        return res.status(400).json({ status: "error", message: "Following ID and following_username are required" });
    }

    next();
};

module.exports = {
    validateFollowingCreation,
    validateFollowingUpdate
};
