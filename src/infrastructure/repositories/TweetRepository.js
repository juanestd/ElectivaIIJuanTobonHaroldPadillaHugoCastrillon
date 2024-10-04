const ITweetRepository = require('../../core/services/contracts/ITweetRepository');
const { TweetModel } = require('../database/models/TweetModel');
const TweetMapper = require('../../core/services/mapping/TweetMapper');

class TweetRepository extends ITweetRepository {
    async createTweet(tweetData) {
        try {
            const tweetDocument = new TweetModel(TweetMapper.toPersistence(tweetData));
            const savedTweet = await tweetDocument.save();
            return TweetMapper.toDomain(savedTweet);
        } catch (error) {
            throw new Error('Error creating tweet');
        }
    }

    async getTweetsByUserId(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const tweets = await TweetModel.find({ createdBy: userId })
                .sort({ createdDate: -1 })
                .skip(skip)
                .limit(limit);

            const totalTweets = await TweetModel.countDocuments({ createdBy: userId });
            return {
                tweets: tweets.map(tweet => TweetMapper.toDomain(tweet)),
                page,
                limit,
                totalPages: Math.ceil(totalTweets / limit),
                totalTweets,
            };
        } catch (error) {
            throw new Error('Error retrieving tweets with pagination');
        }
    }

    async getTweetById(tweetId) {
        try {
            const tweetDocument = await TweetModel.findById(tweetId);
            return tweetDocument ? TweetMapper.toDomain(tweetDocument) : null;
        } catch (error) {
            throw new Error('Error retrieving tweet by ID');
        }
    }

    async updateTweet(tweetId, message) {
        try {
            const updatedTweet = await TweetModel.findByIdAndUpdate(
                tweetId,
                { message, lastModifiedDate: Date.now() },
                { new: true }
            );
            return updatedTweet ? TweetMapper.toDomain(updatedTweet) : null;
        } catch (error) {
            throw new Error('Error updating tweet');
        }
    }

    async deleteTweetById(tweetId) {
        try {
            await TweetModel.findByIdAndDelete(tweetId);
        } catch (error) {
            throw new Error('Error deleting tweet');
        }
    }

    async getTweetsByUserIds(userIds, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const tweets = await TweetModel.find({ createdBy: { $in: userIds } })
                .sort({ createdDate: -1 })
                .skip(skip)
                .limit(limit);

            const totalTweets = await TweetModel.countDocuments({ createdBy: { $in: userIds } });
            return {
                tweets: tweets.map(tweet => TweetMapper.toDomain(tweet)),
                page,
                limit,
                totalPages: Math.ceil(totalTweets / limit),
                totalTweets,
            };
        } catch (error) {
            throw new Error('Error retrieving tweets by user IDs');
        }
    }
}

module.exports = TweetRepository;
