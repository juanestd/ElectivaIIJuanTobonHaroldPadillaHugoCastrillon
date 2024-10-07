const TweetMapper = require('../../../../mapping/TweetMapper');

class GetTweetsByUsernameHandler {
    constructor(userRepository, tweetRepository) {
        this.userRepository = userRepository;
        this.tweetRepository = tweetRepository;
    }

    async handle(query) {
        const { username, page, limit } = query;

        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        const result = await this.tweetRepository.getTweetsByUserId(user.id, page, limit);
        result.tweets = result.tweets.map(tweet => TweetMapper.toClient(tweet));
        return result;
    }
}

module.exports = GetTweetsByUsernameHandler;
