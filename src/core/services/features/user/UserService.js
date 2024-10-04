const CreateUserCommand = require('./commands/CreateUserCommand');
const GetUserByIdQuery = require('./queries/GetUserByIdQuery');
const LoginUserQuery = require('./queries/LoginUserQuery');
const GetAuthenticatedUserQuery = require('./queries/GetAuthenticatedUserQuery');
const LogoutUserCommand = require('./commands/LogoutUserCommand');

class UserService {
    constructor(userRepository, authService, tokenBlacklist) {
        this.createUserCommand = new CreateUserCommand(userRepository);
        this.getUserByIdQuery = new GetUserByIdQuery(userRepository);
        this.loginUserQuery = new LoginUserQuery(authService);
        this.getAuthenticatedUserQuery = new GetAuthenticatedUserQuery(authService, userRepository);
        this.logoutUserCommand = new LogoutUserCommand(tokenBlacklist);
    }

    async createUser(userData) {
        return await this.createUserCommand.execute(userData);
    }

    async getUserById(userId) {
        return await this.getUserByIdQuery.execute(userId);
    }

    async loginUser(username, password) {
        return await this.loginUserQuery.execute(username, password);
    }

    async getAuthenticatedUser(token) {
        return await this.getAuthenticatedUserQuery.execute(token);
    }

    async logoutUser(token) {
        return await this.logoutUserCommand.execute(token);
    }
}

module.exports = UserService;
