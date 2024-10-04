const UserMapper = require('../../../mapping/UserMapper');

class GetUserByIdQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const user = await this.userRepository.getById(userId);
        return user ? UserMapper.toClient(user) : null;
    }
}

module.exports = GetUserByIdQuery;
