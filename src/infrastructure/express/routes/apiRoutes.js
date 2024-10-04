const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const FollowRoutes = require('./FollowRoutes');
const TweetRoutes = require('./tweetRoutes');

router.use(UserRoutes);
router.use(FollowRoutes);
router.use(TweetRoutes);

module.exports = router;
