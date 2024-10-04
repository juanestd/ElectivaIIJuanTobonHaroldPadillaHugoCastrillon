const UserMapper = require('../../../mapping/UserMapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUserQuery {
    constructor(authService) {
        this.authService = authService;
    }

    async execute(username, password) {
        const { user, token } = await this.authService.authenticate({ username, password });
        const userClient = UserMapper.toClient(user);

        return { userClient, token };
    }
}

module.exports = LoginUserQuery;
