const bcrypt = require('bcrypt');
const UserMapper = require('../../../mapping/UserMapper');

class CreateUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.userRepository.create({ ...userData, password: hashedPassword });
        return UserMapper.toClient(user);
    }
}

module.exports = CreateUserCommand;