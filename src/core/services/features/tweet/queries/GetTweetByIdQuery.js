const TweetMapper = require('../../../../services/mapping/TweetMapper');

class GetTweetByIdQuery {
    constructor(tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    async execute(tweetId) {
        const tweet = await this.tweetRepository.getTweetById(tweetId);
        return tweet ? TweetMapper.toClient(tweet) : null;
    }
}

module.exports = GetTweetByIdQuery;
