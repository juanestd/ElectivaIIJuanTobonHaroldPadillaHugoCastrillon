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
const { validateFollowerCreation, validateFollowerUpdate } = require("../middlewares/middlewareFollower");

router.get('/:username/followers/', getFollowers);
router.get('/:username/followers/:id_follower', getFollowerById);
router.post('/:username/followers/', validateFollowerCreation, createFollower);
router.put('/:username/followers/', validateFollowerUpdate, updateFollower);
router.delete('/:username/followers/:id_follower', deleteFollower);
router.get('/:username/followers/counts/', countFollowers);

module.exports = router;
