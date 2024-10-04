const express = require("express");
const router = express.Router();
const FollowController = require("../../../adapters/controllers/FollowController");
const FollowService = require("../../../core/services/features/follow/FollowService");
const FollowRepository = require("../../../infrastructure/repositories/FollowRepository");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const { validateFollowerId, validateFollowingId, validateUserId, validateUsername } = require('../middlewares/FollowMiddleware');
const { authMiddleware } = require('../middlewares/AuthMiddleware');

const followRepository = new FollowRepository();
const userRepository = new UserRepository();
const followService = new FollowService(userRepository, followRepository);
const followController = new FollowController(followService);

router.post('/:followerId/follow/:followingId', authMiddleware, validateFollowerId, validateFollowingId, (req, res) => {
    followController.followUser(req, res);
});

router.post('/:followerId/follow/by-username', authMiddleware, validateFollowerId, validateUsername, (req, res) => {
    followController.followByUsername(req, res);
});

router.get('/:userId/followers/count', authMiddleware, validateUserId, (req, res) => {
    followController.getFollowerCount(req, res);
});

router.get('/:userId/followers', authMiddleware, validateUserId, (req, res) => {
    followController.getFollowers(req, res);
});

router.get('/:userId/following', authMiddleware, validateUserId, (req, res) => {
    followController.getFollowing(req, res);
});

module.exports = router;
