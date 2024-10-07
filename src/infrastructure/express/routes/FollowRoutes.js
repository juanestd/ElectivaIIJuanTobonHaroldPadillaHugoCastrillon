const express = require("express");
const FollowController = require("../../../adapters/controllers/FollowController");
const FollowRepository = require("../../../infrastructure/repositories/FollowRepository");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const { validateFollowingId, validateUsername } = require('../middlewares/FollowMiddleware');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const FollowUserHandler = require("../../../core/services/features/follow/commands/FollowUserCommand/FollowUserHandler");
const FollowByUsernameHandler = require("../../../core/services/features/follow/commands/FollowByUsernameCommand/FollowByUsernameHandler");
const CountFollowersHandler = require("../../../core/services/features/follow/queries/CountFollowersQuery/CountFollowersHandler");
const CountFollowingHandler = require("../../../core/services/features/follow/queries/CountFollowingQuery/CountFollowingHandler");
const GetFollowersHandler = require("../../../core/services/features/follow/queries/GetFollowersQuery/GetFollowersHandler");
const GetFollowingHandler = require("../../../core/services/features/follow/queries/GetFollowingQuery/GetFollowingHandler");

module.exports = ({ authService, tokenBlacklist }) => {
    const router = express.Router();

    const followRepository = new FollowRepository();
    const userRepository = new UserRepository();

    const followUserHandler = new FollowUserHandler(followRepository);
    const followByUsernameHandler = new FollowByUsernameHandler(userRepository, followRepository);
    const countFollowersHandler = new CountFollowersHandler(followRepository, userRepository);
    const countFollowingHandler = new CountFollowingHandler(followRepository, userRepository);
    const getFollowersHandler = new GetFollowersHandler(followRepository, userRepository);
    const getFollowingHandler = new GetFollowingHandler(followRepository, userRepository);

    const followController = new FollowController(
        followUserHandler,
        followByUsernameHandler,
        countFollowersHandler,
        countFollowingHandler,
        getFollowersHandler,
        getFollowingHandler
    );

    router.post(
        '/:username/follow',
        authMiddleware(authService, tokenBlacklist),
        validateUsername,
        (req, res) => {
            followController.followByUsername(req, res);
        }
    );

    router.post(
        '/follow/:followingId',
        authMiddleware(authService, tokenBlacklist),
        validateFollowingId,
        (req, res) => {
            followController.followUser(req, res);
        }
    );

    router.get(
        '/:username/followers/count',
        authMiddleware(authService, tokenBlacklist),
        validateUsername,
        (req, res) => {
            followController.getFollowerCount(req, res);
        }
    );

    router.get(
        '/:username/following/count',
        authMiddleware(authService, tokenBlacklist),
        validateUsername,
        (req, res) => {
            followController.getFollowingCount(req, res);
        }
    );

    router.get(
        '/:username/followers',
        authMiddleware(authService, tokenBlacklist),
        validateUsername,
        (req, res) => {
            followController.getFollowers(req, res);
        }
    );

    router.get(
        '/:username/following',
        authMiddleware(authService, tokenBlacklist),
        validateUsername,
        (req, res) => {
            followController.getFollowing(req, res);
        }
    );

    return router;
};
