class FollowingController {
    constructor(followingService) {
        this.followingService = followingService;
    }

    async getFollowings(req, res) {
        const { username } = req.params;
        const followings = await this.followingService.getFollowings(username);
        res.json(followings);
    }

    async createFollowing(req, res) {
        const { username } = req.params;
        const { following_username } = req.body;
        const following = await this.followingService.createFollowing({ username, following_username });
        res.status(201).json(following);
    }

    async updateFollowing(req, res) {
        const { id_following } = req.body;
        const following = await this.followingService.updateFollowing(id_following, req.body);
        res.json(following);
    }

    async deleteFollowing(req, res) {
        const { id_following } = req.params;
        await this.followingService.deleteFollowing(id_following);
        res.status(204).send();
    }

    async countFollowings(req, res) {
        const { username } = req.params;
        const count = await this.followingService.countFollowings(username);
        res.json({ count });
    }
}

module.exports = FollowingController;
