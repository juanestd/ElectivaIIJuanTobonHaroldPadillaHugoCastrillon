const express = require("express");
const router = express.Router();
const {
  getFollowings,
  getFollowingById,
  createFollowing,
  updateFollowing,
  deleteFollowing,
  countFollowings,
} = require("../../../adapters/controllers/followingControllers");
const { validateFollowingCreation, validateFollowingUpdate } = require("../middlewares/middlewareFollowing");

router.get('/:username/following/', getFollowings);
router.get('/:username/following/:id_following', getFollowingById);
router.post('/:username/following/', validateFollowingCreation, createFollowing);
router.put('/:username/following/', validateFollowingUpdate, updateFollowing);
router.delete('/:username/following/:id_following', deleteFollowing);
router.get('/:username/following/counts/', countFollowings);

module.exports = router;
