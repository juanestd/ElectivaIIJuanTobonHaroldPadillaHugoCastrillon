const express = require("express");
const router = express.Router();
const {
  getFollowings,
  getFollowingById,
  createFollowing,
  updateFollowing,
  deleteFollowing,
  countFollowings,
} = require("../controllers/followingControllers");

router.get('/:username/following/', getFollowings);
router.get('/:username/following/:id_following', getFollowingById);
router.get('/:username/following/counts/', countFollowings);
router.post('/:username/following/', createFollowing);
router.put('/:username/following/', updateFollowing);
router.delete('/:username/following/:id_following', deleteFollowing);

module.exports = router;
