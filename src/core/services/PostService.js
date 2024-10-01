class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async getPosts(username) {
        return await this.postRepository.findByUsername(username);
    }

    async getPostById(id) {
        return await this.postRepository.findById(id);
    }

    async createPost(post) {
        return await this.postRepository.save(post);
    }

    async updatePost(id, post) {
        return await this.postRepository.update(id, post);
    }

    async deletePost(id) {
        return await this.postRepository.delete(id);
    }
}

module.exports = PostService;
