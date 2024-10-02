const express = require("express");
const router = express.Router();
const PostController = require("../../../adapters/controllers/postController");
const { validatePostCreation, validatePostUpdate } = require("../middlewares/PostMiddleware");
const PostService = require("../../../core/services/PostService");
const PostRepository = require("../../../adapters/repositories/PostRepository");

const postService = new PostService(new PostRepository());
const postController = new PostController(postService);

router.get('/:username/posts/', (req, res) => postController.getPosts(req, res));
router.get('/:username/posts/:id_post', (req, res) => postController.getPostById(req, res));
router.post('/:username/posts/', validatePostCreation, (req, res) => postController.createPost(req, res));
router.put('/:username/posts/', validatePostUpdate, (req, res) => postController.updatePost(req, res));
router.delete('/:username/posts/:id_post', (req, res) => postController.deletePost(req, res));

module.exports = router;
