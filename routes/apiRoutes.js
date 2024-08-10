const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const postsRoutes = require("./postsRoutes");
const followersRoutes = require("./followersRoutes");
const followingRoutes = require("./followingRoutes");

router.use(authRoutes);
router.use(postsRoutes);
router.use(followersRoutes);
router.use(followingRoutes);

module.exports = router;
