const IFollowRepository = require('../../core/services/contracts/IFollowRepository');
const { FollowModel } = require('../database/models/FollowModel');

class FollowRepository extends IFollowRepository {
    async countFollowers(userId) {
        try {
            return await FollowModel.countDocuments({ following: userId });
        } catch (error) {
            throw new Error('Error counting followers');
        }
    }

    async countFollowing(userId) {
        try {
            return await FollowModel.countDocuments({ follower: userId });
        } catch (error) {
            throw new Error('Error counting following users');
        }
    }

    async getFollowers(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const followers = await FollowModel.find({ following: userId })
                .populate('follower', 'name username')
                .sort({ 'follower.name': 1 })
                .skip(skip)
                .limit(limit);

            return followers.map(f => ({
                name: f.follower.name,
                username: f.follower.username,
            }));
        } catch (error) {
            throw new Error('Error retrieving followers');
        }
    }

    async getFollowing(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const following = await FollowModel.find({ follower: userId })
                .populate('following', 'name username')
                .sort({ 'following.name': 1 })
                .skip(skip)
                .limit(limit);

            return following.map(f => ({
                name: f.following.name,
                username: f.following.username,
            }));
        } catch (error) {
            throw new Error('Error retrieving following users');
        }
    }

    async followUser(followerId, followingId) {
        try {
            const existingFollow = await FollowModel.findOne({ follower: followerId, following: followingId });
            if (!existingFollow) {
                const newFollow = new FollowModel({ follower: followerId, following: followingId });
                return await newFollow.save();
            }
            return null;
        } catch (error) {
            throw new Error('Error creating follow relationship');
        }
    }

    async getFollowingUserIds(userId) {
        try {
            const following = await FollowModel.find({ follower: userId }, 'following');
            return following.map(f => f.following);
        } catch (error) {
            throw new Error('Error retrieving following user IDs');
        }
    }
}

module.exports = FollowRepository;
