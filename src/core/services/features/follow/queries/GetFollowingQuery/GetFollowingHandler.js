class GetFollowingHandler {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async handle(query) {
        const following = await this.followRepository.getFollowing(query.userId, query.page, query.limit);
        return following.map(f => ({
            name: f.name,
            username: f.username
        }));
    }
}

module.exports = GetFollowingHandler;
