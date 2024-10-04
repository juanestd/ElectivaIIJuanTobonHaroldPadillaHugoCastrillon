class GetFeedQuery {
    constructor(tweetRepository, followRepository) {
        this.tweetRepository = tweetRepository;
        this.followRepository = followRepository;
    }

    async execute(userId, page, limit) {
        const followedUserIds = await this.followRepository.getFollowingUserIds(userId);
        return await this.tweetRepository.getTweetsByUserIds(followedUserIds, page, limit);
    }
}

module.exports = GetFeedQuery;
