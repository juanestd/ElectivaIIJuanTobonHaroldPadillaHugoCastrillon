class FollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }

    async getFollowers(req, res) {
        const { username } = req.params;
        const followers = await this.followerService.getFollowers(username);
        res.json(followers);
    }

    async createFollower(req, res) {
        const { username } = req.params;
        const { follower_username } = req.body;
        const follower = await this.followerService.createFollower({ username, follower_username });
        res.status(201).json(follower);
    }

    async updateFollower(req, res) {
        const { id_follower } = req.body;
        const follower = await this.followerService.updateFollower(id_follower, req.body);
        res.json(follower);
    }

    async deleteFollower(req, res) {
        const { id_follower } = req.params;
        await this.followerService.deleteFollower(id_follower);
        res.status(204).send();
    }

    async countFollowers(req, res) {
        const { username } = req.params;
        const count = await this.followerService.countFollowers(username);
        res.json({ count });
    }
}

module.exports = FollowerController;
