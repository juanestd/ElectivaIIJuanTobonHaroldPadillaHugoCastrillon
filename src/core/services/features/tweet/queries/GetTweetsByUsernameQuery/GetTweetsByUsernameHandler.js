const TweetMapper = require('../../../../mapping/TweetMapper');

class GetTweetsByUsernameHandler {
    constructor(userRepository, tweetRepository, followRepository) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
        this.followRepository = followRepository;
    }

    async handle(query) {
        const {myUserId, username, page, limit } = query;

        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isUserFollowing = await this.followRepository.isFollowing(myUserId, user.id);

        const result = await this.tweetRepository.getTweetsByUserId(user.id, page, limit);
        result.tweets = result.tweets.map(tweet => TweetMapper.toClient(tweet));
        return {
            isUserFollowing,
            ...result
        };
    }
}

module.exports = GetTweetsByUsernameHandler;
