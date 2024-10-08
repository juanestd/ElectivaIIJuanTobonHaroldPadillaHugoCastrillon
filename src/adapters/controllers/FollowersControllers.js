const followers = require('../../core/domain/mocks/FollowersMocks');

const getFollowers = (req, res) => {
    const { username } = req.params;
    const userFollowers = followers.filter(follower => follower.username === username);
    res.json(userFollowers);
};

const getFollowerById = (req, res) => {
    const { id_follower } = req.params;
    const follower = followers.find(f => f.id === parseInt(id_follower));
    if (follower) {
        res.json(follower);
    } else {
        res.status(404).json({ message: "Follower not found" });
    }
};

const createFollower = (req, res) => {
    const { username } = req.params;
    const { follower_username } = req.body;
    const newFollower = { id: new Date().getMilliseconds(), username, follower_username };
    followers.push(newFollower);
    res.status(201).json(newFollower);
};

const updateFollower = (req, res) => {
    const { id_follower } = req.body;
    const follower = followers.find(f => f.id === parseInt(id_follower));
    if (follower) {
        follower.follower_username = req.body.follower_username || follower.follower_username;
        res.json(follower);
    } else {
        res.status(404).json({ message: "Follower not found" });
    }
};

const deleteFollower = (req, res) => {
    const { id_follower } = req.params;
    followers = followers.filter(f => f.id !== parseInt(id_follower));
    res.status(204).send();
};

const countFollowers = (req, res) => {
    const { username } = req.params;
    const count = followers.filter(follower => follower.username === username).length;
    res.json({ count });
};

module.exports = {
    getFollowers,
    getFollowerById,
    createFollower,
    updateFollower,
    deleteFollower,
    countFollowers,
};
