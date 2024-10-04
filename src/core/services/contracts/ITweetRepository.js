class ITweetRepository {
    constructor() {
        if (this.constructor === ITweetRepository) {
            throw new Error("Cannot instantiate an interface directly.");
        }
    }

    async createTweet(tweetData) {
        throw new Error("Method 'createTweet' must be implemented.");
    }

    async getTweetsByUserId(userId, page, limit) {
        throw new Error("Method 'getTweetsByUserId' must be implemented.");
    }

    async getTweetById(tweetId) {
        throw new Error("Method 'getTweetById' must be implemented.");
    }

    async updateTweet(tweetId, message) {
        throw new Error("Method 'updateTweet' must be implemented.");
    }

    async deleteTweetById(tweetId) {
        throw new Error("Method 'deleteTweetById' must be implemented.");
    }

    async getTweetsByUserIds(userIds, page, limit) {
        throw new Error("Method 'getTweetsByUserIds' must be implemented.");
    }
}

module.exports = ITweetRepository;
