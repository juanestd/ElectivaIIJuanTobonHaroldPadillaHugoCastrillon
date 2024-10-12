class GetFollowingQuery {
    constructor(username, page, limit) {
        this.username = username;
        this.page = page;
        this.limit = limit;
    }
}

module.exports = GetFollowingQuery;
