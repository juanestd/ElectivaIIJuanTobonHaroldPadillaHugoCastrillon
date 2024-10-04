const jwt = require('jsonwebtoken');

class GetAuthenticatedUserQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(token) {
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const user = await this.userRepository.getById(decoded.userId);

            if (!user) {
                throw new Error('User not found.');
            }

            return user;
        } catch (error) {
            throw new Error('Invalid token.');
        }
    }
}

module.exports = GetAuthenticatedUserQuery;
