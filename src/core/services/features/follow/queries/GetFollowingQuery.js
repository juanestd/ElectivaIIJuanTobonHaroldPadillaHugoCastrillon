class GetFollowingQuery {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async execute(userId, page, limit) {
        const following = await this.followRepository.getFollowing(userId, page, limit);
        return following.map(f => ({
            name: f.name,
            username: f.username
        }));
    }
}

module.exports = GetFollowingQuery;
