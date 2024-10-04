const express = require("express");
const router = express.Router();
const TweetController = require("../../../adapters/controllers/TweetController");
const { validateTweetCreation, validateTweetUpdate, validateUserId } = require("../middlewares/TweetMiddleware");
const { authMiddleware } = require("../middlewares/AuthMiddleware");  // Asegúrate de tener este middleware configurado
const TweetService = require("../../../core/services/features/tweet/TweetService");
const TweetRepository = require("../../repositories/TweetRepository");
const FollowRepository = require("../../repositories/FollowRepository");

const tweetRepository = new TweetRepository();
const followRepository = new FollowRepository();
const tweetService = new TweetService(tweetRepository, followRepository);
const tweetController = new TweetController(tweetService);

router.get('/:userId/tweets', validateUserId, (req, res) => tweetController.getTweets(req, res));
router.get('/tweets/:id_tweet', (req, res) => tweetController.getTweetById(req, res));
router.post('/:userId/tweets', authMiddleware, validateTweetCreation, (req, res) => tweetController.createTweet(req, res));
router.put('/tweets/:id_tweet', authMiddleware, validateTweetUpdate, (req, res) => tweetController.updateTweet(req, res));
router.delete('/tweets/:id_tweet', authMiddleware, (req, res) => tweetController.deleteTweet(req, res));

router.get('/:userId/feed', authMiddleware, validateUserId, (req, res) => tweetController.getFeed(req, res));

module.exports = router;
