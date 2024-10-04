class CountFollowingQuery {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async execute(userId) {
        return await this.followRepository.countFollowing(userId);
    }
}

module.exports = CountFollowingQuery;
