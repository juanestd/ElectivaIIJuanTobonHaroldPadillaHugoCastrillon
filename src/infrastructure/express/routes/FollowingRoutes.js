const express = require("express");
const router = express.Router();
const FollowingController = require("../../../adapters/controllers/followingController");
const { validateFollowingCreation, validateFollowingUpdate } = require("../middlewares/FollowingMiddleware");
const FollowingService = require("../../../core/services/FollowingService");
const FollowingRepository = require("../../../adapters/repositories/FollowingRepository");

// Instanciar el servicio y el controlador
const followingService = new FollowingService(new FollowingRepository());
const followingController = new FollowingController(followingService);

router.get('/:username/following/', (req, res) => followingController.getFollowings(req, res));
router.get('/:username/following/counts/', (req, res) => followingController.countFollowings(req, res));
router.post('/:username/following/', validateFollowingCreation, (req, res) => followingController.createFollowing(req, res));
router.put('/:username/following/', validateFollowingUpdate, (req, res) => followingController.updateFollowing(req, res));
router.delete('/:username/following/:id_following', (req, res) => followingController.deleteFollowing(req, res));

module.exports = router;
