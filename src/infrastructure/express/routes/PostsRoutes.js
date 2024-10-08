const express = require("express");
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../../../adapters/controllers/postsControllers");
const { validatePostCreation, validatePostUpdate } = require("../middlewares/middlewarePost");

router.get('/:username/posts/', getPosts);
router.get('/:username/posts/:id_post', getPostById);
router.post('/:username/posts/', validatePostCreation, createPost);
router.put('/:username/posts/', validatePostUpdate, updatePost);
router.delete('/:username/posts/:id_post', deletePost);

module.exports = router;
