class FollowByUsernameCommand {
    constructor(userRepository, followRepository) {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }

    async execute(userId, username) {
        const userToFollow = await this.userRepository.getByUsername(username);
        if (!userToFollow) {
            throw new Error('User not found');
        }
        return await this.followRepository.followUser(userId, userToFollow.id);
    }
}

module.exports = FollowByUsernameCommand;
