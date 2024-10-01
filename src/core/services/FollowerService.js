class FollowerService {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async getFollowers(username) {
        return await this.followerRepository.findByUsername(username);
    }

    async createFollower(follower) {
        return await this.followerRepository.save(follower);
    }

    async updateFollower(id, follower) {
        return await this.followerRepository.update(id, follower);
    }

    async deleteFollower(id) {
        return await this.followerRepository.delete(id);
    }

    async countFollowers(username) {
        return await this.followerRepository.countByUsername(username);
    }
}

module.exports = FollowerService;
