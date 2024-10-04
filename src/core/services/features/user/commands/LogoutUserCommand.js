class LogoutUserCommand {
    constructor(tokenBlacklist) {
        this.tokenBlacklist = tokenBlacklist;
    }

    async execute(token) {
        this.tokenBlacklist.add(token);
        return { message: 'Logged out successfully' };
    }
}

module.exports = LogoutUserCommand;
