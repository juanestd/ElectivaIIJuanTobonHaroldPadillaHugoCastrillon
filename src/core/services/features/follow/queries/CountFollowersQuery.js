class CountFollowersQuery {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async execute(userId) {
        return await this.followRepository.countFollowers(userId);
    }
}

module.exports = CountFollowersQuery;
