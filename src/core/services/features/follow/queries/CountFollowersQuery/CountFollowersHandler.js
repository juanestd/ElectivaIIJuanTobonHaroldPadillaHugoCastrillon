class CountFollowersHandler {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async handle(query) {
        return await this.followRepository.countFollowers(query.userId);
    }
}

module.exports = CountFollowersHandler;
