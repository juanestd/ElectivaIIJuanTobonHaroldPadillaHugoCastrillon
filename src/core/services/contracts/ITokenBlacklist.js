class ITokenBlacklist {
    add(token) {
        throw new Error("Method 'add' must be implemented.");
    }

    has(token) {
        throw new Error("Method 'has' must be implemented.");
    }
}

module.exports = ITokenBlacklist;
