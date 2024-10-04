const Tweet = require('../../domain/Tweet');

class TweetMapper {
    static toDomain(tweetDocument) {
        return new Tweet({
            id: tweetDocument._id,
            createdDate: tweetDocument.createdDate,
            createdBy: tweetDocument.createdBy,
            lastModifiedDate: tweetDocument.lastModifiedDate,
            lastModifiedBy: tweetDocument.lastModifiedBy,
            message: tweetDocument.message
        });
    }

    static toPersistence(tweet) {
        return {
            createdDate: tweet.createdDate,
            createdBy: tweet.createdBy,
            lastModifiedDate: tweet.lastModifiedDate,
            lastModifiedBy: tweet.lastModifiedBy,
            message: tweet.message
        };
    }

    static toClient(tweet) {
        return {
            id: tweet.id,
            createdDate: tweet.createdDate,
            createdBy: tweet.createdBy,
            message: tweet.message,
        };
    }
}

module.exports = TweetMapper;
