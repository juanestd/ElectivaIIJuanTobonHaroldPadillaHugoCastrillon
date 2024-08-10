const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authControllers");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsControllers");
 const {
  getFollowers,
  getFollowerById,
  createFollower,
  updateFollower,
  deleteFollower,
  countFollowers,
} = require("../controllers/followersControllers");
const {
  getFollowings,
  getFollowingById,
  createFollowing,
  updateFollowing,
  deleteFollowing,
  countFollowings,
} = require("../controllers/followingControllers");

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes for posts
router.get('/:username/posts/', getPosts);
router.get('/:username/posts/:id_post', getPostById);
router.post('/:username/posts/', createPost);
router.put('/:username/posts/', updatePost);
router.delete('/:username/posts/:id_post', deletePost);

// Routes for followers
router.get('/:username/followers/', getFollowers);
router.get('/:username/followers/:id_follower', getFollowerById);
router.post('/:username/followers/', createFollower);
router.put('/:username/followers/', updateFollower);
router.delete('/:username/followers/:id_follower', deleteFollower);
router.get('/:username/followers/counts/', countFollowers);

// Routes for following
router.get('/:username/following/', getFollowings);
router.get('/:username/following/:id_following', getFollowingById);
router.get('/:username/following/counts/', countFollowings);
router.post('/:username/following/', createFollowing);
router.put('/:username/following/', updateFollowing);
router.delete('/:username/following/:id_following', deleteFollowing);

module.exports = router;
