const followers = require('../mocks/followersMocks');

const validateFollowerCreation = (req, res, next) => {
    const { username } = req.params;
    const { follower_username } = req.body;

    if (!username || !follower_username) {
        return res.status(400).json({ status: "error", message: "Username and follower_username are required" });
    }

    next();
};

const validateFollowerUpdate = (req, res, next) => {
    const { id_follower, follower_username } = req.body;

    if (!id_follower || !follower_username) {
        return res.status(400).json({ status: "error", message: "Follower ID and follower_username are required" });
    }

    next();
};

module.exports = {
    validateFollowerCreation,
    validateFollowerUpdate
};
