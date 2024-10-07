const ITokenBlacklist = require('../../core/services/contracts/ITokenBlacklist');

class TokenBlacklist extends ITokenBlacklist {
    constructor() {
        super();
        this.blacklist = new Set();
    }

    add(token) {
        this.blacklist.add(token);
    }

    has(token) {
        return this.blacklist.has(token);
    }
}

module.exports = TokenBlacklist;
