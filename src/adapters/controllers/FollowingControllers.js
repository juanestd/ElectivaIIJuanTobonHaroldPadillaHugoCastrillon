const followings = require('../../core/domain/mocks/FollowingMocks');

const getFollowings = (req, res) => {
    const { username } = req.params;
    const userFollowings = followings.filter(following => following.username === username);
    res.json(userFollowings);
};

const getFollowingById = (req, res) => {
    const { id_following } = req.params;
    const following = followings.find(f => f.id === parseInt(id_following));
    if (following) {
        res.json(following);
    } else {
        res.status(404).json({ message: "Following not found" });
    }
};

const createFollowing = (req, res) => {
    const { username } = req.params;
    const { following_username } = req.body;
    const newFollowing = { id: new Date().getMilliseconds(), username, following_username };
    followings.push(newFollowing);
    res.status(201).json(newFollowing);
};

const updateFollowing = (req, res) => {
    const { id_following } = req.body;
    const following = followings.find(f => f.id === parseInt(id_following));
    if (following) {
        following.following_username = req.body.following_username || following.following_username;
        res.json(following);
    } else {
        res.status(404).json({ message: "Following not found" });
    }
};

const deleteFollowing = (req, res) => {
    const { id_following } = req.params;
    followings = followings.filter(f => f.id !== parseInt(id_following));
    res.status(204).send();
};

const countFollowings = (req, res) => {
    const { username } = req.params;
    const count = followings.filter(following => following.username === username).length;
    res.json({ count });
};

module.exports = {
    getFollowings,
    getFollowingById,
    createFollowing,
    updateFollowing,
    deleteFollowing,
    countFollowings,
};
