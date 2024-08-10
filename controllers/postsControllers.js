let posts = require('../mocks/postMocks');

const getPosts = (req, res) => {
    const { username } = req.params;
    const userPosts = posts.filter(post => post.username === username);
    res.json({status: "ok", userPosts});
};

const getPostById = (req, res) => {
    const { id_post } = req.params;
    const post = posts.find(post => post.id === parseInt(id_post));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
};

const createPost = (req, res) => {
    const { username } = req.params;
    const { message } = req.body;
    const newPost = { id: new Date().getMilliseconds(), username, username, message };
    posts.push(newPost);
    res.status(201).json(newPost);
};

const updatePost = (req, res) => {
    const { id } = req.body;
    const post = posts.find(post => post.id === parseInt(id));
    if (post) {
        post.message = req.body.message || post.message;
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
};

const deletePost = (req, res) => {
    const { id_post } = req.params;
    posts = posts.filter(post => post.id !== parseInt(id_post));
    res.status(204).send();
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};