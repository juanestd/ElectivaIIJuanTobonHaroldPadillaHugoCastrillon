const TweetMapper = require('../../../../services/mapping/TweetMapper');

class CreateTweetCommand {
    constructor(tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    async execute(tweetData) {
        const createdTweet = await this.tweetRepository.createTweet(tweetData);
        return TweetMapper.toClient(createdTweet);
    }
}

module.exports = CreateTweetCommand;
