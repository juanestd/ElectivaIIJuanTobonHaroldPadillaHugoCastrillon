class CountFollowingHandler {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async handle(query) {
        return await this.followRepository.countFollowing(query.userId);
    }
}

module.exports = CountFollowingHandler;
