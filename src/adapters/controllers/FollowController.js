/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Operations related to following and followers
 */
class FollowController {
    constructor(followService) {
        this.followService = followService;
    }

    /**
     * @swagger
     * /{followerId}/follow/{followingId}:
     *   post:
     *     summary: Follow a user
     *     tags: [Follow]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: followerId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user who wants to follow
     *       - in: path
     *         name: followingId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to be followed
     *     responses:
     *       201:
     *         description: User followed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *       400:
     *         description: Already following this user
     *       500:
     *         description: Internal server error
     */
    async followUser(req, res) {
        try {
            const { followerId, followingId } = req.params;
            const result = await this.followService.followUser(followerId, followingId);
            if (result) {
                res.status(201).json({ message: 'Now following user' });
            } else {
                res.status(400).json({ message: 'Already following this user' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while following the user' });
        }
    }

    /**
     * @swagger
     * /{userId}/followers/count:
     *   get:
     *     summary: Get follower count for a user
     *     tags: [Follow]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user
     *     responses:
     *       200:
     *         description: Follower count
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 followers:
     *                   type: integer
     *                 following:
     *                   type: integer
     *       500:
     *         description: Internal server error
     */
    async getFollowerCount(req, res) {
        try {
            const { userId } = req.params;
            const followers = await this.followService.countFollowers(userId);
            const following = await this.followService.countFollowing(userId);
            res.status(200).json({ followers, following });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving the count' });
        }
    }

    /**
     * @swagger
     * /{userId}/followers:
     *   get:
     *     summary: Get a list of followers for a user
     *     tags: [Follow]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user
     *       - in: query
     *         name: page
     *         required: false
     *         schema:
     *           type: integer
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         required: false
     *         schema:
     *           type: integer
     *         description: Number of results per page
     *     responses:
     *       200:
     *         description: List of followers
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 followers:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       name:
     *                         type: string
     *                       username:
     *                         type: string
     *       500:
     *         description: Internal server error
     */
    async getFollowers(req, res) {
        try {
            const { userId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const followers = await this.followService.getFollowers(userId, page, limit);
            res.status(200).json({ followers });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving followers' });
        }
    }

    /**
     * @swagger
     * /{userId}/following:
     *   get:
     *     summary: Get a list of users the user is following
     *     tags: [Follow]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user
     *       - in: query
     *         name: page
     *         required: false
     *         schema:
     *           type: integer
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         required: false
     *         schema:
     *           type: integer
     *         description: Number of results per page
     *     responses:
     *       200:
     *         description: List of users the user is following
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 following:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       name:
     *                         type: string
     *                       username:
     *                         type: string
     *       500:
     *         description: Internal server error
     */
    async getFollowing(req, res) {
        try {
            const { userId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const following = await this.followService.getFollowing(userId, page, limit);
            res.status(200).json({ following });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving following users' });
        }
    }

    /**
     * @swagger
     * /{userId}/follow/by-username:
     *   post:
     *     summary: Follow a user by username
     *     tags: [Follow]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user who wants to follow
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: The username to follow
     *     responses:
     *       201:
     *         description: User followed successfully
     *       400:
     *         description: Already following the user
     *       500:
     *         description: Internal server error
     */
    async followByUsername(req, res) {
        try {
            const { userId } = req.params;
            const { username } = req.body;
            const result = await this.followService.followUserByUsername(userId, username);
            if (result) {
                res.status(201).json({ message: 'Now following user' });
            } else {
                res.status(400).json({ message: 'Already following this user' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while following the user' });
        }
    }
}

module.exports = FollowController;
