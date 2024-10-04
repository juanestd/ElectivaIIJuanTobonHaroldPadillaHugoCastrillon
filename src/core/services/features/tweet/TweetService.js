const CreateTweetCommand = require('./commands/CreateTweetCommand');
const UpdateTweetCommand = require('./commands/UpdateTweetCommand');
const GetTweetByIdQuery = require('./queries/GetTweetByIdQuery');
const GetTweetsByUserIdQuery = require('./queries/GetTweetsByUserIdQuery');
const DeleteTweetCommand = require('./commands/DeleteTweetCommand');
const GetFeedQuery = require('./queries/GetFeedQuery');

class TweetService {
    constructor(tweetRepository, followRepository) {
        this.createTweetCommand = new CreateTweetCommand(tweetRepository);
        this.updateTweetCommand = new UpdateTweetCommand(tweetRepository);
        this.getTweetByIdQuery = new GetTweetByIdQuery(tweetRepository);
        this.getTweetsByUserIdQuery = new GetTweetsByUserIdQuery(tweetRepository);
        this.deleteTweetCommand = new DeleteTweetCommand(tweetRepository);
        this.getFeedQuery = new GetFeedQuery(tweetRepository, followRepository);
    }

    async createTweet(tweetData) {
        return await this.createTweetCommand.execute(tweetData);
    }

    async updateTweet(tweetId, message) {
        return await this.updateTweetCommand.execute(tweetId, message);
    }

    async getTweetById(tweetId) {
        return await this.getTweetByIdQuery.execute(tweetId);
    }

    async getTweetsByUserId(userId, page, limit) {
        return await this.getTweetsByUserIdQuery.execute(userId, page, limit);
    }

    async deleteTweetById(tweetId) {
        return await this.deleteTweetCommand.execute(tweetId);
    }

    async getFeed(userId, page, limit) {
        return await this.getFeedQuery.execute(userId, page, limit);
    }
}

module.exports = TweetService;
