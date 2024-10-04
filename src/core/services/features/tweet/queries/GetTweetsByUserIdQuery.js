const TweetMapper = require('../../../../services/mapping/TweetMapper');

class GetTweetsByUserIdQuery {
    constructor(tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    async execute(userId, page, limit) {
        const result = await this.tweetRepository.getTweetsByUserId(userId, page, limit);
        result.tweets = result.tweets.map(tweet => TweetMapper.toClient(tweet));
        return result;
    }
}

module.exports = GetTweetsByUserIdQuery;
