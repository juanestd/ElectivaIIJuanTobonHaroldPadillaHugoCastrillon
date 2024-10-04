class IFollowRepository {
    constructor() {
        if (this.constructor === IFollowRepository) {
            throw new Error("Cannot instantiate an interface directly.");
        }
    }

    async countFollowers(userId) {
        throw new Error("Method 'countFollowers' must be implemented.");
    }

    async countFollowing(userId) {
        throw new Error("Method 'countFollowing' must be implemented.");
    }

    async getFollowers(userId, page, limit) {
        throw new Error("Method 'getFollowers' must be implemented.");
    }

    async getFollowing(userId, page, limit) {
        throw new Error("Method 'getFollowing' must be implemented.");
    }

    async followUser(followerId, followingId) {
        throw new Error("Method 'followUser' must be implemented.");
    }

    async getFollowingUserIds(userId) {
        throw new Error("Method 'getFollowingUserIds' must be implemented.");
    }
}

module.exports = IFollowRepository;
