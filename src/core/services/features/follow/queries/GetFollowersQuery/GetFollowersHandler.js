class GetFollowersHandler {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async handle(query) {
        const followers = await this.followRepository.getFollowers(query.userId, query.page, query.limit);
        return followers.map(f => ({
            name: f.name,
            username: f.username
        }));
    }
}

module.exports = GetFollowersHandler;
