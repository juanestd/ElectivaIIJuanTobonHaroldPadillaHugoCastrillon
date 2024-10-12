const express = require("express");
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const AuthRoutes = require("./AuthRoutes");
const postsRoutes = require("./PostsRoutes");
const FollowRoutes = require('./FollowRoutes');


module.exports = ({ authService, tokenBlacklist }) => {
    router.use(UserRoutes({ authService, tokenBlacklist }));
    router.use(AuthRoutes({ authService, tokenBlacklist }));
    router.use(postsRoutes);
    router.use(FollowRoutes({ authService, tokenBlacklist }));
    return router;
};
