const express = require("express");
const router = express.Router();
const FollowerController = require("../../../adapters/controllers/followersController");
const { validateFollowerCreation, validateFollowerUpdate } = require("../middlewares/FollowerMiddleware");
const FollowerService = require("../../../core/services/FollowerService");
const FollowerRepository = require("../../../adapters/repositories/FollowerRepository");

const followerService = new FollowerService(new FollowerRepository());
const followerController = new FollowerController(followerService);

router.get('/:username/followers/', (req, res) => followerController.getFollowers(req, res));
router.get('/:username/followers/counts/', (req, res) => followerController.countFollowers(req, res));
router.post('/:username/followers/', validateFollowerCreation, (req, res) => followerController.createFollower(req, res));
router.put('/:username/followers/', validateFollowerUpdate, (req, res) => followerController.updateFollower(req, res));
router.delete('/:username/followers/:id_follower', (req, res) => followerController.deleteFollower(req, res));

module.exports = router;
