/**
 * @swagger
 * tags:
 *   name: Tweet
 *   description: Tweet management and operations
 */
class TweetController {
    constructor(tweetService) {
        this.tweetService = tweetService;
    }

    /**
     * @swagger
     * /{userId}/tweets:
     *   get:
     *     summary: Get tweets of a specific user with pagination
     *     tags: [Tweet]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         required: false
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         required: false
     *         description: Number of tweets per page
     *     responses:
     *       200:
     *         description: List of tweets
     */
    async getTweets(req, res) {
        try {
            const { userId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await this.tweetService.getTweetsByUserId(userId, page, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving tweets' });
        }
    }

    /**
     * @swagger
     * /tweets/{id_tweet}:
     *   get:
     *     summary: Get a tweet by its ID
     *     tags: [Tweet]
     *     parameters:
     *       - in: path
     *         name: id_tweet
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the tweet
     *     responses:
     *       200:
     *         description: Tweet details
     */
    async getTweetById(req, res) {
        try {
            const { id_tweet } = req.params;
            const tweet = await this.tweetService.getTweetById(id_tweet);
            if (!tweet) {
                return res.status(404).json({ message: 'Tweet not found' });
            }
            res.status(200).json({ tweet });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving the tweet' });
        }
    }

    /**
     * @swagger
     * /{userId}/tweets:
     *   post:
     *     summary: Create a new tweet
     *     tags: [Tweet]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user creating the tweet
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - message
     *             properties:
     *               message:
     *                 type: string
     *                 description: The content of the tweet
     *                 maxLength: 280
     *     responses:
     *       201:
     *         description: Tweet created successfully
     */
    async createTweet(req, res) {
        try {
            const { userId } = req.params;
            const { message } = req.body;
            const tweet = await this.tweetService.createTweet({ message, createdBy: userId });
            res.status(201).json({ message: 'Tweet published successfully', tweet });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     * @swagger
     * /tweets/{id_tweet}:
     *   put:
     *     summary: Update an existing tweet
     *     tags: [Tweet]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id_tweet
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the tweet
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               message:
     *                 type: string
     *                 description: Updated content of the tweet
     *                 maxLength: 280
     *     responses:
     *       200:
     *         description: Tweet updated successfully
     */
    async updateTweet(req, res) {
        try {
            const { id_tweet } = req.params;
            const { message } = req.body;
            const updatedTweet = await this.tweetService.updateTweet(id_tweet, message);
            res.status(200).json({ message: 'Tweet updated successfully', updatedTweet });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /tweets/{id_tweet}:
     *   delete:
     *     summary: Delete a tweet by its ID
     *     tags: [Tweet]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id_tweet
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the tweet
     *     responses:
     *       200:
     *         description: Tweet deleted successfully
     */
    async deleteTweet(req, res) {
        try {
            const { id_tweet } = req.params;
            await this.tweetService.deleteTweetById(id_tweet);
            res.status(200).json({ message: 'Tweet deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while deleting the tweet' });
        }
    }

    /**
     * @swagger
     * /{userId}/feed:
     *   get:
     *     summary: Get tweets from followed users
     *     tags: [Tweet]
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
     *         schema:
     *           type: integer
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Number of tweets per page
     *     responses:
     *       200:
     *         description: List of tweets from followed users
     */
    async getFeed(req, res) {
        try {
            const { userId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const tweets = await this.tweetService.getFeed(userId, page, limit);
            res.status(200).json(tweets);
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while retrieving the feed' });
        }
    }
}

module.exports = TweetController;
