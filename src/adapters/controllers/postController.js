class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    async getPosts(req, res) {
        const { username } = req.params;
        const posts = await this.postService.getPosts(username);
        res.json({ status: "ok", posts });
    }

    async getPostById(req, res) {
        const { id_post } = req.params;
        const post = await this.postService.getPostById(id_post);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }

    async createPost(req, res) {
        const { username } = req.params;
        const { message } = req.body;
        const newPost = await this.postService.createPost({ username, message });
        res.status(201).json(newPost);
    }

    async updatePost(req, res) {
        const { id_post } = req.body;
        const updatedPost = await this.postService.updatePost(id_post, req.body);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }

    async deletePost(req, res) {
        const { id_post } = req.params;
        await this.postService.deletePost(id_post);
        res.status(204).send();
    }
}

module.exports = PostController;
