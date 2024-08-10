const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsControllers");

router.get('/:username/posts/', getPosts);
router.get('/:username/posts/:id_post', getPostById);
router.post('/:username/posts/', createPost);
router.put('/:username/posts/', updatePost);
router.delete('/:username/posts/:id_post', deletePost);

module.exports = router;
