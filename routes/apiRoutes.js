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
router.get('/posts/:username/', getPosts);
router.get('/posts/:username/:id_post', getPostById);
router.post('/posts/:username/', createPost);
router.put('/posts/:username/', updatePost);
router.delete('/posts/:username/:id_post', deletePost);

// Routes for followers
router.get('/followers/:username/', getFollowers);
router.get('/followers/:username/:id_follower', getFollowerById);
router.post('/followers/:username/', createFollower);
router.put('/followers/:username/', updateFollower);
router.delete('/followers/:username/:id_follower', deleteFollower);
router.get('/followers/:username/counts/', countFollowers);

// Routes for following
router.get('/following/:username/', getFollowings);
router.get('/following/:username/:id_following', getFollowingById);
router.get('/following/:username/counts/', countFollowings);
router.post('/following/:username/', createFollowing);
router.put('/following/:username/', updateFollowing);
router.delete('/following/:username/:id_following', deleteFollowing);

module.exports = router;
