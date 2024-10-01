const express = require('express');
const router = express.Router();

const AuthRoutes = require('./authRoutes');
const followerRoutes = require('./followersRoutes');
const followingRoutes = require('./FollowingRoutes');
const postRoutes = require('./PostsRoutes');

router.use(AuthRoutes);
router.use(followerRoutes);
router.use(followingRoutes);
router.use(postRoutes);

module.exports = router;
