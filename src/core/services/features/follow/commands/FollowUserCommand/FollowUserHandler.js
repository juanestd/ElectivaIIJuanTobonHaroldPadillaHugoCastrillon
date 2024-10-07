const FollowMapper = require('../../../../mapping/FollowMapper');

class FollowUserHandler {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async handle(command) {
        const followRecord = await this.followRepository.followUser(command.followerId, command.followingId);
        return followRecord ? FollowMapper.toClient(FollowMapper.toDomain(followRecord)) : null;
    }
}

module.exports = FollowUserHandler;
