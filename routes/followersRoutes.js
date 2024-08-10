const express = require("express");
const router = express.Router();
const {
  getFollowers,
  getFollowerById,
  createFollower,
  updateFollower,
  deleteFollower,
  countFollowers,
} = require("../controllers/followersControllers");

router.get('/:username/followers/', getFollowers);
router.get('/:username/followers/:id_follower', getFollowerById);
router.post('/:username/followers/', createFollower);
router.put('/:username/followers/', updateFollower);
router.delete('/:username/followers/:id_follower', deleteFollower);
router.get('/:username/followers/counts/', countFollowers);

module.exports = router;
