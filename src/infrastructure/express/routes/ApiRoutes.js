const express = require("express");
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const authRoutes = require("./AuthRoutes");
const postsRoutes = require("./PostsRoutes");
const followersRoutes = require("./FollowersRoutes");
const followingRoutes = require("./FollowingRoutes");

router.use(UserRoutes());
router.use(authRoutes);
router.use(postsRoutes);
router.use(followersRoutes);
router.use(followingRoutes);

module.exports = router;
