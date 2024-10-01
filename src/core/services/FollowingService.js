class FollowingService {
    constructor(followingRepository) {
        this.followingRepository = followingRepository;
    }

    async getFollowings(username) {
        return await this.followingRepository.findByUsername(username);
    }

    async createFollowing(following) {
        return await this.followingRepository.save(following);
    }

    async updateFollowing(id, following) {
        return await this.followingRepository.update(id, following);
    }

    async deleteFollowing(id) {
        return await this.followingRepository.delete(id);
    }

    async countFollowings(username) {
        return await this.followingRepository.countByUsername(username);
    }
}

module.exports = FollowingService;
