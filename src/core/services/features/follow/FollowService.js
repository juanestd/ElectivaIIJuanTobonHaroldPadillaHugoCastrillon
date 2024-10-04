const FollowUserCommand = require('./commands/FollowUserCommand');
const CountFollowersQuery = require('./queries/CountFollowersQuery');
const CountFollowingQuery = require('./queries/CountFollowingQuery');
const GetFollowersQuery = require('./queries/GetFollowersQuery');
const GetFollowingQuery = require('./queries/GetFollowingQuery');
const FollowByUsernameCommand = require('./commands/FollowByUsernameCommand');

class FollowService {
    constructor(userRepository, followRepository) {
        this.followUserCommand = new FollowUserCommand(followRepository);
        this.countFollowersQuery = new CountFollowersQuery(followRepository);
        this.countFollowingQuery = new CountFollowingQuery(followRepository);
        this.getFollowersQuery = new GetFollowersQuery(followRepository);
        this.getFollowingQuery = new GetFollowingQuery(followRepository);
        this.followByUsernameCommand = new FollowByUsernameCommand(userRepository, followRepository);
    }

    async followUser(followerId, followingId) {
        return await this.followUserCommand.execute(followerId, followingId);
    }

    async countFollowers(userId) {
        return await this.countFollowersQuery.execute(userId);
    }

    async countFollowing(userId) {
        return await this.countFollowingQuery.execute(userId);
    }

    async getFollowers(userId, page, limit) {
        return await this.getFollowersQuery.execute(userId, page, limit);
    }

    async getFollowing(userId, page, limit) {
        return await this.getFollowingQuery.execute(userId, page, limit);
    }

    async followByUsername(userId, username) {
        return await this.followByUsernameCommand.execute(userId, username);
    }
}

module.exports = FollowService;
