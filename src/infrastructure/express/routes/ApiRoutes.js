const express = require("express");
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const AuthRoutes = require("./AuthRoutes");
const postsRoutes = require("./PostsRoutes");
const followersRoutes = require("./FollowersRoutes");
const followingRoutes = require("./FollowingRoutes");

module.exports = ({ authService, tokenBlacklist }) => {
    router.use(UserRoutes( ));
    router.use(AuthRoutes({ authService, tokenBlacklist }));
    router.use(postsRoutes);
    router.use(followersRoutes);
    router.use(followingRoutes);
    return router;
};
