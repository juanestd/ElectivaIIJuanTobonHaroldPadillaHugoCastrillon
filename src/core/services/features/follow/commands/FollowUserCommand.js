const FollowMapper = require('../../../mapping/FollowMapper');

class FollowUserCommand {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }

    async execute(followerId, followingId) {
        const followRecord = await this.followRepository.followUser(followerId, followingId);
        return followRecord ? FollowMapper.toClient(FollowMapper.toDomain(followRecord)) : null;
    }
}

module.exports = FollowUserCommand;
