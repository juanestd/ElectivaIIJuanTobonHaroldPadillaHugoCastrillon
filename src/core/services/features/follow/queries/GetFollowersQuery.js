class GetFollowersQuery {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async execute(userId, page, limit) {
        const followers = await this.followRepository.getFollowers(userId, page, limit);
        return followers.map(f => ({
            name: f.name,
            username: f.username
        }));
    }
}

module.exports = GetFollowersQuery;
