const validateFollowerCreation = (req, res, next) => {
    const { follower_username } = req.body;
    if (!follower_username) {
        return res.status(400).json({ status: "error", message: "Follower username is required" });
    }
    next();
};

const validateFollowerUpdate = (req, res, next) => {
    const { id_follower, follower_username } = req.body;
    if (!id_follower || !follower_username) {
        return res.status(400).json({ status: "error", message: "Follower ID and follower username are required" });
    }
    next();
};

module.exports = {
    validateFollowerCreation,
    validateFollowerUpdate
};
